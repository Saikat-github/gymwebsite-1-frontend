// src/components/forms/sections/MembershipDetailsSection.jsx
import { ClipboardList, ExternalLink } from 'lucide-react';

const MembershipDetails = ({ register, errors, navigate }) => (
  <div>
    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
      <ClipboardList size={20} /> Membership Details
    </h3>
    <p onClick={() => navigate("/plans")} className="flex items-center gap-1 text-orange-600 text-sm cursor-pointer">
      See Our Latest Plans <ExternalLink className="w-4" />
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      {[
        {
          name: "membershipType",
          options: ["Monthly", "Quarterly", "Half-yearly", "Yearly"],
          label: "Select Membership Type",
          required: "Membership type is required"
        },
        {
          name: "paymentMethod",
          options: ["Online", "Offline"],
          label: "Select Payment Method",
        }
      ].map(({ name, options, label, required }, idx) => (
        <div key={idx}>
          <select
            {...register(name, { required })}
            className="bg-slate-900 outline-none p-2 rounded w-full"
          >
            <option value="">{label}</option>
            {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {errors[name] && <p className="text-red-600 text-xs sm:text-sm">{errors[name].message}</p>}
        </div>
      ))}
    </div>
  </div>
);

export default MembershipDetails;
