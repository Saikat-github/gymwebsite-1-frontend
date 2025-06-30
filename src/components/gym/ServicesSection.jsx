import React from 'react';
import { assets } from '../../assets/assets';

const services = [
  { name: 'Strength Training', image: assets.serviceImage1 },
  { name: 'Cardio', image: assets.serviceImage2 },
  { name: 'Yoga', image: assets.serviceImage3 },
  { name: 'Zumba', image: assets.serviceImage4 }
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-4 md:px-20 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="relative group h-64 rounded-2xl overflow-hidden shadow-lg border border-gray-800"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 opacity-40 group-hover:opacity-100"
              style={{ backgroundImage: `url(${service.image})` }}
            ></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-300"></div>
            <div className="relative z-10 h-full flex items-center justify-center text-center">
              <h3 className="text-xl md:text-2xl font-semibold">{service.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
