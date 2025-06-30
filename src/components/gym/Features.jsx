import React from 'react'
import { Dumbbell, Clock, Users } from 'lucide-react'


const Features = () => {
  return (
    <div className="py-12 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Why Choose Minimalist?</h2>
          <p className="mt-4 text-lg ">We provide everything you need to achieve your fitness goals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-gray-600 rounded-2xl">
            <Dumbbell className="h-6 w-6 mb-4 text-orange-600" />
            <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
            <p className="">State-of-the-art fitness equipment to help you reach your goals faster.</p>
          </div>

          <div className="p-6 border border-gray-600 rounded-2xl">
            <Clock className="h-6 w-6 mb-4 text-orange-600" />
            <h3 className="text-xl font-semibold mb-2">Flexible Hours</h3>
            <p className="">Open 24/7 to accommodate your busy schedule and lifestyle.</p>
          </div>

          <div className="p-6 border border-gray-600 rounded-2xl">
            <Users className="h-6 w-6 mb-4 text-orange-600" />
            <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
            <p className="">Certified fitness professionals to guide and motivate you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features