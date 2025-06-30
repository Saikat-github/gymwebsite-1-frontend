import React from 'react'
import { galleryImages } from '../../assets/assets'


const GymGallery = () => {
  return (
    <div className='text-center my-10 space-y-4'>
      <h1 className="text-2xl">Gym Interior Gallery</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6 sm:px-10 py-4 sm:py-10'>
        {
          galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery Image ${index + 1}`}
              className='w-full h-64 object-cover mb-4 rounded-lg shadow-lg md:hover:scale-110 transition-transform duration-300'
              loading='lazy'
            />
          ))
        }
      </div>
    </div>
  )
}

export default GymGallery