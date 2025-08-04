// src/components/forms/sections/HealthInfoSection.jsx
import { Dumbbell } from 'lucide-react';

const HealthInformation = ({ register, errors }) => (
  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
      <Dumbbell size={20} /> Health Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Weight Field */}
      <div>
        <input
          type="text"
          inputMode="numeric" // Mobile keyboards will show numeric keypad
          pattern="[0-9]*" // Only allow numbers
          placeholder="Weight (in kg)"
          {...register('weight', {
            required: 'Weight is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Weight must be a number'
            },
            validate: {
              min: (value) => {
                const num = parseInt(value, 10);
                return num >= 30 || 'Weight must be at least 30 kg';
              },
              max: (value) => {
                const num = parseInt(value, 10);
                return num <= 300 || 'Weight must be less than 300 kg';
              }
            }
          })}
          className="bg-slate-900 outline-none p-2 rounded w-full"
          onKeyPress={(e) => {
            // Only allow numbers
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {errors.weight && <p className="text-red-600 text-xs sm:text-sm">{errors.weight.message}</p>}
      </div>

      {/* Height Field */}
      <div>
        <input
          type="text"
          inputMode="numeric" // Mobile keyboards will show numeric keypad
          pattern="[0-9]*" // Only allow numbers
          placeholder="Height (in cm)"
          {...register('height', {
            required: 'Height is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Height must be a number'
            },
            validate: {
              min: (value) => {
                const num = parseInt(value, 10);
                return num >= 100 || 'Height must be at least 100 cm';
              },
              max: (value) => {
                const num = parseInt(value, 10);
                return num <= 250 || 'Height must be less than 250 cm';
              }
            }
          })}
          className="bg-slate-900 outline-none p-2 rounded w-full"
          onKeyPress={(e) => {
            // Only allow numbers
            if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
        {errors.height && <p className="text-red-600 text-xs sm:text-sm">{errors.height.message}</p>}
      </div>

      {/* Medical Condition Field */}
      <div>
        <input
          {...register("medicalCondition")}
          type="text"
          placeholder="Medical Condition (if any)"
          className="bg-slate-900 outline-none p-2 rounded w-full"
        />
        {errors.medicalCondition && <p className="text-red-600 text-xs sm:text-sm">{errors.medicalCondition.message}</p>}
      </div>
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