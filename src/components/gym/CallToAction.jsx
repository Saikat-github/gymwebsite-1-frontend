import React, { useContext } from 'react'
import { ArrowRight } from 'lucide-react'
import { assets } from "../../assets/assets";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const CallToAction = () => {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()
    return (
        <div className="h-96 py-12 mt-20 bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${assets.otherImage1})` }}>
            <div className="absolute inset-0 bg-black/40 z-0" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 my-10">
                <h2 className="text-3xl font-bold mb-8">Ready to Start Your Fitness Journey ?</h2>
                <button
                    disabled={user ? true : false}
                    onClick={() => navigate("/login")}
                    className="px-8 py-3 text-orange-600 font-semibold rounded-md flex items-center gap-2 hover:gap-4 cursor-pointer transition-all duration-200 border-2 border-orange-600 mx-auto">
                    Sign Up Now
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export default CallToAction