import { ArrowRight, Loader2 } from "lucide-react";
import { functions } from "../../services/firebase/config"
import { httpsCallable } from 'firebase/functions';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const RazorpayPayment = ({ amount, planId, userId, email, name, dayPassId, id, navigateTo }) => {
  const { getMemberInfo } = useContext(AuthContext);
  const [loader, setLoader] = useState(false)
  const createOrder = httpsCallable(functions, 'createOrder');
  const verifyPayment = httpsCallable(functions, 'verifyPayment');

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      setLoader(true);
      // Step 1: Create order
      const orderResult = await createOrder({
        amount,
        planId,
        userId,
        dayPassId,
        planDocId: id
      });

      const { orderId, key } = orderResult.data;

      // Step 2: Initialize Razorpay
      const options = {
       key,
        amount: amount * 100,
        currency: 'INR',
        name: 'Minimalist Gyms',
        description: `${planId} Membership`,
        order_id: orderId,
        handler: async (response) => {
          try {
            // Step 3: Verify payment
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResult.data.success) {
              toast.success(verificationResult.data.message || 'Payment successful!');
              // ✅ Await the update before navigating
              await getMemberInfo();
              navigate(navigateTo)
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed!');
            setLoader(false); // Set loader off on failure
          }
        },
        prefill: {
          name: name || 'Customer',
          email: email || 'customer@example.com',
        },
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => {
            // ✅ Reset loader if user closes Razorpay without paying
            setLoader(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order!');
      setLoader(false);
    }
  };



  return (
    <div className="flex justify-center my-28">
      <button
        disabled={loader}
        onClick={() => handlePayment()}
        className="py-2 rounded border-2 border-orange-600 flex gap-2 px-2 hover:gap-4 cursor-pointer transition-all duration-200"
      >
        Pay ₹{amount} for {planId} Plan {loader ? <Loader2 className="animate-spin" /> : <ArrowRight />}
      </button>
    </div>
  );
}

export default RazorpayPayment