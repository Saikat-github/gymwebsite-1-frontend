import React, { useRef } from 'react';
import { Mail, Phone, Calendar, User, IndianRupee, CheckCircle, XCircle, Clock, Download, Info } from 'lucide-react';
import { getISTTime } from '../../utils/utilFunctions';
import { jsPDF } from 'jspdf';
import { gymLogoBase64 } from '../../assets/assets';



const SingleDayPass = ({ dayPass }) => {
  const pdfRef = useRef();

  if (!dayPass) return null;

  const {
    name,
    email,
    phone,
    age,
    amount,
    noOfDays,
    availed,
    payment,
    paymentId,
    createdAt,
    userId,
    paymentDate,
    paymentMethod,
    endDate,
  } = dayPass;

  const Field = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-2 border-b border-white/10 py-2 flex-wrap">
      <Icon className="w-4 h-4 text-orange-600" />
      <span className="font-medium text-white">{label} : </span>
      <span className="text-gray-300 truncate">{value ?? '—'}</span>
    </div>
  );

  const handleDownload = () => {
    if (payment !== "completed") {
      return;
    }
    const doc = new jsPDF();

    // Add logo image (x, y, width, height)
    doc.addImage(gymLogoBase64, 'PNG', 20, 6, 30, 30);

    // Gym name and address next to logo
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Minimalist Gyms", 55, 18);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Raj College More, Burdwan, WB, 713101, India", 55, 24);
    doc.text("Contact: +91 9999999999 | www.minimalistgyms.com", 55, 30);

    // Line separator
    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);

    // Invoice Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Day-Pass Invoice", 20, 45);

    // Membership Details
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const lines = [
      `User ID: ${userId}`,
      `Name: ${name}`,
      `Phone : ${phone}`,
      `Age : ${age}`,
      `No. of Days: ${noOfDays}`,
      `Created on: ${createdAt && getISTTime(createdAt).toLocaleString()}`,
      `Expires on: ${endDate ? getISTTime(endDate) : "_"}`,
      `Availed: ${availed ? 'Yes' : 'No'}`,
      `Amount: Rs. ${amount}`,
      `Payment Id: ${paymentId ? paymentId : '_'}`,
      `Payment Status: ${payment}`,
    ];

    lines.forEach((line, index) => {
      doc.text(line, 20, 60 + index * 10);
    });

    // Save the PDF
    doc.save(`invoice_minimalist_gyms.pdf`);
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div ref={pdfRef} className="bg-gray-900/50 p-4 rounded-xl shadow-md backdrop-blur-md text-white">
        <h2 className="text-xl font-semibold mb-3 text-orange-600 flex items-center">
          <User className="w-5 h-5 mr-2" />
          {name || 'Unnamed'}
        </h2>
        <Download onClick={handleDownload} className={`w-5 cursor-pointer absolute right-2 top-4 ${payment !== "completed" && "hidden"}`} />

        <div className="text-sm space-y-2">
          <Field icon={Mail} label="Email" value={email} />
          <Field icon={Phone} label="Phone" value={phone} />
          <Field icon={Calendar} label="Age" value={age} />
          <Field icon={Clock} label="No. of Days" value={noOfDays} />
          <Field icon={CheckCircle} label="Created At" value={getISTTime(createdAt)} />
          {paymentDate && <Field icon={Calendar} label="Payment Date" value={getISTTime(paymentDate)} />}
          {endDate && <Field icon={Calendar} label="Expires On" value={getISTTime(endDate)} />}
          <Field icon={availed ? CheckCircle : XCircle} label="Availed" value={availed ? 'Yes' : 'No'} />
          <Field icon={IndianRupee} label="Amount" value={`₹${amount}`} />
          {paymentId && <Field icon={CheckCircle} label="Payment ID" value={paymentId} />}
          {payment !== "completed"
            &&
            <div>
              <p className='text-gray-300 p-2 border border-red-600 rounded text-xs'>Payment for this day pass is pending, if any money got deducted from your account, it will be auto-refunded within 5-7 business days.</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default SingleDayPass;
