import { User } from 'lucide-react';

const PersonalInfo = ({ register, errors }) => (
  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><User size={20} /> Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* First Name */}
      <div>
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
        {errors.name && <p className="text-red-600 text-xs sm:text-sm">{errors.name.message}</p>}
      </div>
      {/* Last Name */}
      <div>
        <input
          inputMode="numeric" // Mobile keyboards will show numeric keypad
          pattern="[0-9]*" // Only allow numbers
          placeholder="Age"
          {...register('age', {
            required: 'Age is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Age must be a number'
            },
            validate: {
              min: (value) => {
                const num = parseInt(value, 10);
                return num >= 12 || 'Must be at least 12 years old';
              },
              max: (value) => {
                const num = parseInt(value, 10);
                return num <= 100 || 'Age must be less than 100';
              }
            }
          })}
          className="w-full bg-gray-900 rounded px-2 py-2 outline-none"
        />
        {errors.age && <p className="text-red-600 text-xs sm:text-sm">{errors.age.message}</p>}
      </div>
      {/* Phone */}
      <div>
        <input {...register("phone", {
          required: "Phone number is required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter a valid 10-digit Indian phone number",
          },
        })} type="tel" placeholder="Phone Number" className="bg-slate-900 outline-none p-2 rounded w-full" />
        {errors.phone && <p className="text-red-600 text-xs sm:text-sm">{errors.phone.message}</p>}
      </div>
      {/* Gender */}
      <div>
        <select {...register("gender", { required: "Gender is required" })}
          className="bg-slate-900 outline-none p-2 rounded w-full">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <p className="text-red-600 text-xs sm:text-sm">{errors.gender.message}</p>}
      </div>
    </div>
  </div>
);

export default PersonalInfo;
