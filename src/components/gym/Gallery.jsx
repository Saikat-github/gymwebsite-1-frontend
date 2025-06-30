import React from 'react'
import { gymImages } from '../../assets/assets'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {

  const navigate = useNavigate()
  
  
  return (
    <div className=" py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">State of the Art Equipment</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Ultra modern equipments that help you reach your goals faster.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20 py-10">
        {gymImages.map((image, idx) => (
          <div
            key={idx}
            className="bg-gray-800 rounded-xl shadow-lg hover:scale-[1.03] transition-transform duration-200"
          >
            <img
              src={image}
              loading="lazy"
              alt={`Equipment ${idx + 1}`}
              className="object-contain rounded-xl"
            />
          </div>
        ))}
      </div>
      <button
      onClick={() => navigate("/gallery")}
       className="px-8 py-3 text-white font-semibold rounded-md flex items-center gap-2 hover:gap-4 cursor-pointer transition-all duration-200 border-2 border-orange-600 mx-auto">
        Take a virtual tour
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Gallery