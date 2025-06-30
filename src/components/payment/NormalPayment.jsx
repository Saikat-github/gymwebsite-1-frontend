import React from 'react'
import { IndianRupee, Tag, Calendar, DollarSign, UploadCloud } from 'lucide-react';
import QRCode from 'react-qr-code';
import conf from '../../conf/conf';



const NormalPayment = ({title, price, duration}) => {

    // Build dynamic UPI link with encoded parameters
    const upiLink = `${conf.upiLink}${price}&cu=INR`


    return (
        <div className="max-w-2xl mx-auto pt-2 pb-6 px-6 rounded-lg shadow-md shadow-orange-600 mb-10 flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-8">
                <p className="text-xs text-center text-gray-400">
                    Scan the QR code to pay ₹{price} to Minimalist Gyms and upload the payment screenshot.
                </p>
                <div className='space-y-2 flex flex-col items-center text-xs text-slate-400'>
                    <QRCode value={upiLink} className="bg-white p-2 rounded" />
                    <p>PhonePe No : {conf.upiPhoneNo}
                        <br />UPI Id : {conf.upiId}</p>
                </div>
                <label htmlFor="screenshot" className='w-full py-2 px-4 text-sm bg-orange-700 text-white rounded hover:bg-orange-600 transition duration-200 cursor-pointer text-center flex justify-center gap-2 items-center'><UploadCloud />Upload Screenshot</label>
                <input
                    id="screenshot"
                    type="file"
                    className="hidden"
                />
            </div>


            <div className="mx-auto text-xs">
                <p className="text-sm font-semibold flex gap-1 items-center text-orange-500">
                    <Tag className="w-6" /> Plan Details
                </p>
                <p className="ml-2 flex gap-1 items-center">
                    <DollarSign className='w-4 text-orange-500' />
                    Price: <IndianRupee className="w-3" />{price}
                </p>
                <p className="ml-2 flex gap-1 items-center">
                    <Calendar className="w-4 text-orange-500" /> Duration: {duration}
                </p>
            </div>
        </div>
    )
}

export default NormalPayment