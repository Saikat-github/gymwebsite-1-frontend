// src/components/forms/sections/HealthInfoSection.jsx
import { Dumbbell } from 'lucide-react';

const HealthInformation = ({ register, errors }) => (
  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
      <Dumbbell size={20} /> Health Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        {
          name: "weight",
          type: "number",
          placeholder: "Weight (in kg)",
          required: "Weight is required"
        },
        {
          name: "height",
          type: "number",
          placeholder: "Height (in cm)",
          required: "Height is required"
        },
        {
          name: "medicalCondition",
          type: "text",
          placeholder: "Medical Condition (if any)",
          required: false
        }
      ].map(({ name, type, placeholder, required }, idx) => (
        <div key={idx}>
          <input
            {...register(name, required ? { required } : {})}
            type={type}
            placeholder={placeholder}
            className="bg-slate-900 outline-none p-2 rounded w-full"
          />
          {errors[name] && <p className="text-red-600 text-xs sm:text-sm">{errors[name].message}</p>}
        </div>
      ))}
    </div>
    <div className='mt-4'>
      <select
        {...register("fitnessGoal", { required: "Fitness goal is required" })}
        className="bg-slate-900 text-white p-2 rounded w-full outline-none"
      >
        <option value="">Select Your Goal</option>
        <option value="Fat Loss">Fat Loss</option>
        <option value="Muscle Building">Muscle Building</option>
        <option value="General Fitness">General Fitness</option>
        <option value="Sports Performance">Sports Performance</option>
      </select>
      {errors.fitnessGoal && <p className="text-red-600 text-xs sm:text-sm">{errors.fitnessGoal.message}</p>}
    </div>
  </div>
);

export default HealthInformation;
