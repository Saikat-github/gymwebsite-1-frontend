import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import { logger } from 'firebase-functions';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { v2 as cloudinary } from "cloudinary";



// Initialize Firebase Admin
initializeApp();
const db = getFirestore();



// Define your secrets using defineSecret
const RAZORPAY_KEY_ID = defineSecret('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = defineSecret('RAZORPAY_KEY_SECRET');
const RAZORPAY_WEBHOOK_SECRET = defineSecret('RAZORPAY_WEBHOOK_SECRET');
const CLOUDINARY_CLOUD_NAME = defineSecret('CLOUDINARY_CLOUD_NAME');
const CLOUDINARY_API_KEY = defineSecret('CLOUDINARY_API_KEY');
const CLOUDINARY_API_SECRET = defineSecret('CLOUDINARY_API_SECRET');




// Helper function to calculate membership end date based on existing membership
function calculateEndDate(planId, existingEndDate = null) {
  const planDurations = {
    'day-pass': 7,
    monthly: 30,
    quaterly: 90,
    'half-yearly': 180,
    yearly: 365,
  };

  const days = planDurations[planId] || 30;

  let startDate;

  if (existingEndDate && existingEndDate.seconds) {
    // Firebase Timestamp format: { seconds: number, nanoseconds: number }
    const existingEndDateTime = new Date(existingEndDate.seconds * 1000);
    startDate = existingEndDateTime;
  } else {
    // No existing membership, start from current time
    startDate = new Date();
  }

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);
  return Timestamp.fromDate(endDate);
}





// createOrder function with secret bindings
export const createOrder = onCall({
  secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
  cors: true,
}, async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { amount, currency = 'INR', planId, userId, dayPassId } = request.data;

    if (!amount || !planId || !userId) {
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    // const userDoc = await db.collection('users').doc(userId).get();
    // if (!userDoc.exists) {
    //   throw new HttpsError('not-found', 'User not found');
    // }

    // Initialize Razorpay inside the function to access secrets' values
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID.value(),
      key_secret: RAZORPAY_KEY_SECRET.value(),
    });

    const orderOptions = {
      amount: amount * 100,
      currency,
      receipt: `gym_${userId.slice(0, 12)}_${Date.now()}`,
      notes: {
        userId,
        planId,
        type: 'gym_membership',
      },
    };

    const order = await razorpay.orders.create(orderOptions);

    await db.collection('payments').doc(order.id).set({
      orderId: order.id,
      dayPassId,
      userId,
      planId,
      amount,
      currency,
      status: 'created',
      createdAt: FieldValue.serverTimestamp(),
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: RAZORPAY_KEY_ID.value(),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new HttpsError('internal', 'Unable to create order');
  }
});





// verifyPayment function with secret bindings
export const verifyPayment = onCall({
  secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
  cors: true,
}, async (request) => {
  try {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'User must be authenticated');
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.data;

    // Initialize Razorpay here too
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID.value(),
      key_secret: RAZORPAY_KEY_SECRET.value(),
    });

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET.value())
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      throw new HttpsError('invalid-argument', 'Invalid payment signature');
    }

    // Check if payment already processed or order exists
    const orderDoc = await db.collection('payments').doc(razorpay_order_id).get();
    if (!orderDoc.exists) {
      throw new HttpsError('not-found', 'Order not found');
    }
    if (orderDoc.data().status === 'completed') {
      return { success: true, message: 'Payment already processed' };
    }

    const orderData = orderDoc.data();
    const { userId, planId, amount, dayPassId } = orderData;

    const payment = await razorpay.payments.fetch(razorpay_payment_id);

    //Seperate logic for day pass plan
    if (planId === "day-pass") {
      const endDateForDayPass = calculateEndDate(planId);

      await db.runTransaction(async (transaction) => {
        transaction.update(db.collection('payments').doc(razorpay_order_id), {
          status: 'completed',
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          completedAt: FieldValue.serverTimestamp(),
        });

        transaction.update(db.collection('dayPasses').doc(dayPassId), {
          payment: 'completed',
          paymentId: razorpay_payment_id,
          paymentMethod: payment.method,
          paymentDate: FieldValue.serverTimestamp(),
          orderId: razorpay_order_id,
          endDate: endDateForDayPass,
          updatedAt: FieldValue.serverTimestamp(),
        });
      });

      return { success: true, message: 'Payment verified and day pass activated' };
    }

    // Logic for other plans
    // Get user data to check for existing membership end date
    // Query users collection by userId field
    const userQuery = await db.collection('users').where('userId', '==', userId).get();

    if (userQuery.empty) {
      throw new Error('User not found');
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    const existingEndDate = userData?.endDate || null;

    // Calculate new end date based on existing membership
    const newEndDate = calculateEndDate(planId, existingEndDate);

    await db.runTransaction(async (transaction) => {
      transaction.update(db.collection('payments').doc(razorpay_order_id), {
        status: 'completed',
        paymentId: razorpay_payment_id,
        completedAt: FieldValue.serverTimestamp(),
      });

      const membershipData = {
        userId,
        planId,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount,
        status: 'active',
        endDate: newEndDate,
        createdAt: FieldValue.serverTimestamp(),
        paymentMethod: payment.method,
      };

      const membershipRef = db.collection('memberships').doc();
      transaction.set(membershipRef, membershipData);

      // Update using the document reference, not userId
      transaction.update(userDoc.ref, {
        currentmembershipId: membershipRef.id,
        membershipStatus: 'active',
        lastPaymentDate: FieldValue.serverTimestamp(),
        endDate: newEndDate,
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    return { success: true, message: 'Payment verified and membership activated' };
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw new HttpsError('internal', 'Payment verification failed');
  }
});








//Webhook to handle Razorpay events
export const razorpayWebhook = onRequest({
  secrets: [RAZORPAY_WEBHOOK_SECRET],
  cors: false, // Disable CORS for webhooks
}, async (req, res) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).send('Method not allowed');
    }

    const signature = req.headers['x-razorpay-signature'];
    const body = JSON.stringify(req.body);

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET.value())
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature');
      return res.status(400).send('Invalid signature');
    }

    const event = req.body;

    // Handle payment.captured event
    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;
      const orderId = payment.order_id;

      // Check if payment already processed
      const orderDoc = await db.collection('payments').doc(orderId).get();
      if (!orderDoc.exists || orderDoc.data().status === 'completed') {
        return res.status(200).send('Already processed');
      }

      const orderData = orderDoc.data();
      const { userId, planId, amount, dayPassId } = orderData;

      // Same logic as your verifyPayment function
      if (planId === "day-pass") {
        const endDateForDayPass = calculateEndDate(planId);

        await db.runTransaction(async (transaction) => {
          transaction.update(db.collection('payments').doc(orderId), {
            status: 'completed',
            paymentId: payment.id,
            completedAt: FieldValue.serverTimestamp(),
          });

          transaction.update(db.collection('dayPasses').doc(dayPassId), {
            payment: 'completed',
            paymentId: payment.id,
            paymentMethod: payment.method,
            paymentDate: FieldValue.serverTimestamp(),
            orderId: razorpay_order_id,
            endDate: endDateForDayPass,
            updatedAt: FieldValue.serverTimestamp(),
          });
        });
      } else {
        // Logic for other plans
        // Get user data to check for existing membership end date
        // Query users collection by userId field
        const userQuery = await db.collection('users').where('userId', '==', userId).get();

        if (userQuery.empty) {
          throw new Error('User not found');
        }

        const userDoc = userQuery.docs[0];
        const userData = userDoc.data();
        const existingEndDate = userData?.endDate || null;

        // Calculate new end date based on existing membership
        const newEndDate = calculateEndDate(planId, existingEndDate);

        await db.runTransaction(async (transaction) => {
          transaction.update(db.collection('payments').doc(razorpay_order_id), {
            status: 'completed',
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
            completedAt: FieldValue.serverTimestamp(),
          });

          const membershipData = {
            userId,
            planId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount,
            status: 'active',
            endDate: newEndDate,
            createdAt: FieldValue.serverTimestamp(),
            paymentMethod: payment.method,
          };

          const membershipRef = db.collection('memberships').doc();
          transaction.set(membershipRef, membershipData);

          // Update using the document reference, not userId
          transaction.update(userDoc.ref, {
            currentmembershipId: membershipRef.id,
            membershipStatus: 'active',
            lastPaymentDate: FieldValue.serverTimestamp(),
            endDate: newEndDate,
            updatedAt: FieldValue.serverTimestamp(),
          });
        });
      }
    }
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Internal error');
  }
});







export const deleteCloudinaryImage = onCall({
  secrets: [CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET]
}, async (request) => {
  // Configure Cloudinary with secrets
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME.value(),
    api_key: CLOUDINARY_API_KEY.value(),
    api_secret: CLOUDINARY_API_SECRET.value(),
  });
  try {
    // Validate input
    const { publicId } = request.data;

    if (!publicId || typeof publicId !== 'string') {
      throw new HttpsError('invalid-argument', 'Valid publicId is required');
    }

    // Delete image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      throw new HttpsError('not-found', 'Image not found or already deleted');
    }

    logger.info(`Image deleted successfully: ${publicId}`);

    return {
      success: true,
      publicId: publicId,
      message: 'Image deleted successfully'
    };

  } catch (error) {
    logger.error('Error deleting image:', error);

    if (error instanceof HttpsError) {
      throw error;
    }

    throw new HttpsError('internal', 'Failed to delete image');
  }
});