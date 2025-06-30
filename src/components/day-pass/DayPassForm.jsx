import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, Mail, Calendar, Heart, AlertCircle, CheckCircle, X } from 'lucide-react';
import { addDocument } from '../../services/firebase/db';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';




const DayPassForm = () => {
  const [loader, setLoader] = useState(false);
  const [amount, setAmount] = useState(99);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);



  const onSubmit = async (data) => {
    try {
      setLoader(true);
      const result = await addDocument('dayPasses', {
        ...data,
        email: user.email,
        amount: amount,
        userId: user.uid,
        payment: "pending",
        availed: false,
      })
      if (result.success) {
        navigate('/payment-page', {
          state:
          {
            title: "Day-Pass",
            price: amount,
            memberId: result.id,
            navigateTo: "/day-pass/get-passes"
          }
        });
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setLoader(false)
    }
  }


  return (
    <div className="relative bg-slate-950 text-white p-6 rounded-lg max-w-md mx-auto shadow-lg text-sm shadow-orange-600 my-6">
      <X
      onClick={() => navigate('/day-pass')} 
      className='w-6 absolute right-2 top-0.5 cursor-pointer'/>
      <h2 className="text-2xl font-semibold mb-2 text-center">Day Pass : ₹99/1 day</h2>

      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className="block mb-1">Name <span className="text-red-500">*</span></label>
          <div className="flex items-center bg-gray-900 rounded">
            <User className="ml-2 w-5 h-5 text-gray-400" />
            <input
              {...register('name', { required: 'Name is required', minLength: 2 })}
              className="flex-1 bg-transparent px-2 py-2 outline-none"
              placeholder="Full Name"
            />
          </div>
          {errors.name && <p className="text-red-600 text-xs sm:text-sm">{errors.name.message}</p>}
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1">Age <span className="text-red-500">*</span></label>
          <input
            {...register('age', {
              required: 'Age is required',
              valueAsNumber: true,
              min: { value: 12, message: 'Must be at least 12' },
              max: { value: 100, message: 'Unrealistic age' },
            })}
            type="number"
            className="w-full bg-gray-900 rounded px-2 py-2 outline-none"
            placeholder="e.g. 25"
          />
          {errors.age && <p className="text-red-600 text-xs sm:text-sm">{errors.age.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1">Phone Number <span className="text-red-500">*</span></label>
          <div className="flex items-center bg-gray-900 rounded">
            <Phone className="ml-2 w-5 h-5 text-gray-400" />
            <input
              {...register('phone', {
                required: 'Phone is required',
                pattern: { value: /^[6-9]\d{9}$/, message: 'Must start with 6‑9 and be 10 digits' },
              })}
              className="flex-1 bg-transparent px-2 py-2 outline-none"
              placeholder="e.g. 9876543210"
            />
          </div>
          {errors.phone && <p className="text-red-600 text-xs sm:text-sm">{errors.phone.message}</p>}
        </div>


        {/* Number of Days */}
        <div>
          <label className="block mb-1">Number of Days <span className="text-red-500">*</span></label>
          <input
            {...register('noOfDays', {
              required: 'Number of days is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be at least 1' },
              max: { value: 7, message: 'Maximum 7 days allowed' },
            })}
            type="number"
            className="w-full bg-gray-900 rounded px-2 py-2 outline-none"
            placeholder="For how many days?"
            onChange={(e) => setAmount(e.target.value * 99)}
          />
          {errors.noOfDays && <p className="text-red-600 text-xs sm:text-sm">{errors.noOfDays.message}</p>}
        </div>

        {/* Terms */}
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('terms', {
                required: 'You must agree to the terms and conditions',
              })}
              className="form-checkbox bg-slate-900 outline-none text-indigo-500"
            />
            <p className="ml-2">
              I agree to the{' '}
              <Link
                to={"/terms"}
                className="text-orange-600 underline cursor-pointer"
              >
                Terms and Conditions
              </Link>
            </p>
          </label>
          {errors.terms && (
            <p className="text-red-600 text-xs sm:text-sm">{errors.terms.message}</p>
          )}
        </div>


        <hr className='mt-10' />


        {/* Price (read-only) */}
        <div className="flex items-center justify-between p-3 rounded text-orange-600">
          <span>Sub Total :</span>
          <span className="font-semibold">₹{amount}</span>
        </div>

        <p className='text-xs border border-red-600 px-2 pb-1 rounded'><span className='text-red-600 text-lg'>*</span>Day passes get expired after 7 days from the date of buying, so avail your day passes within 7 days.</p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loader}
          className="w-full border border-orange-600 hover:bg-slate-900 disabled:opacity-50 flex items-center justify-center py-2 rounded text-white transition-all duration-200 cursor-pointer"
        >
          {loader ? (
            "Navigating to payment page..."
          ) : (
            <>Buy Day Pass</>
          )}
        </button>
      </form>
    </div>
  )
}

export default DayPassForm