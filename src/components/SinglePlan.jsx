import React, { useContext } from 'react'
import { CheckCircle, Tag, Percent, BadgePercent, IndianRupee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';



const SinglePlan = ({ title, price, duration, features, popular, discount }) => {
    const { memberData, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handlePlanSelect = () => {
        if (!user) {
            toast.error("Please login to select a plan");
            return navigate("/login");
        }
        if(title === "Day-Pass") {
            return navigate("/day-pass")
        }

        if (memberData) {
            navigate('/payment-page', { state: { title, price, memberId: memberData.id, navigateTo: "/membership-details" } });
        } else {
            toast.error("Please complete your profile to select a plan");
            navigate("/profile")
        }

    }

    return (
        <div
            className={`bg-gradient-to-b from-gray-900 to-blue-950 p-8 rounded-lg shadow-md relative ${popular ? 'border-2 border-orange-500' : ''}`}
        >
            {popular && (
                <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Popular
                </div>
            )}
            <h3 className="text-lg sm:text-xl font-bold mb-4">{title}</h3>
            <p className="text-xl sm:text-3xl font-bold mb-4 flex items-center">
                <IndianRupee className='w-4' />{price}/{duration}
                <span className="text-lg text-gray-500"></span>
            </p>
            {discount
                &&
                <p className='flex items-center'>
                    <Tag className='h-5 w-5 text-green-500 mr-2' />
                    <IndianRupee className='w-4' />{discount}
                </p>}
            <ul className="mb-8 space-y-2">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={handlePlanSelect}
                className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-800 cursor-pointer transition-all duration-200">
                Select Plan
            </button>
        </div>
    )
}

export default SinglePlan