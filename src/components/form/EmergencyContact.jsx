// src/components/forms/sections/EmergencyContactSection.jsx
import { ShieldCheck } from 'lucide-react';

const EmergencyContact = ({ register, errors }) => (
  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
      <ShieldCheck size={20} /> Emergency Contact
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input {...register("emergencyName")} placeholder="Contact Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
      <input {...register("emergencyRelation")} placeholder="Relationship" className="bg-slate-900 outline-none p-2 rounded w-full" />
      <div>
        <input
          {...register("emergencyPhone", {
            required: "Emergency phone is required",
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: "Enter a valid 10-digit Indian phone number",
            },
          })}
          type="tel"
          placeholder="Phone Number"
          className="bg-slate-900 outline-none p-2 rounded w-full"
        />
        {errors.emergencyPhone && <p className="text-red-600 text-xs sm:text-sm">{errors.emergencyPhone.message}</p>}
      </div>
    </div>
  </div>
);

export default EmergencyContact;
