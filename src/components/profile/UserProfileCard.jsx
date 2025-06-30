import React from 'react'
import {
  User, Phone, Mail, Calendar, Heart, Ruler, Weight,
  ShieldCheck, ClipboardList, CreditCard, AlertTriangle, Contact, Edit,
  Info, Trash2, UserX
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DeleteButtons from './DeleteButtons'

const UserProfileCard = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-2xl shadow-lg shadow-orange-600 border-orange-600 p-6 md:p-8 space-y-6">
        {/* Top Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12">
          <img
            src={user.imageUrl.secure_url}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold tracking-wide">{user.firstName} {user.lastName}</h2>
            <p className="text-slate-100 flex items-center justify-center md:justify-start gap-2"><Mail size={16} /> {user.userEmail}</p>
            <p className="text-slate-100 flex items-center justify-center md:justify-start gap-2"><Phone size={16} /> {user.phone}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Link
              to='/admission-form'
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-slate-900 text-white text-sm border border-orange-600 transition duration-200 cursor-pointer"
            >
              <Edit size={16} /> Edit
            </Link>
            <Link
              to={"/membership-details"}
              className="flex items-center gap-2 px-4 py-2 rounded hover:bg-slate-900 text-white text-sm border border-orange-600 transition duration-200 cursor-pointer"
            >
              <CreditCard size={16} /> Memberships Details
            </Link>
          </div>

        </div>

        {user.membershipStatus === "inactive" && <p className='text-xs p-2  rounded border text-orange-600'>You don't have any active membership, please buy a membership plan to continue using our gym services. <Link to="/plans" className='underline'>Click Here</Link></p>}

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <InfoItem icon={<Calendar size={18} />} label="Age" value={user.age} />
          <InfoItem icon={<CreditCard size={18} />} label="Gender" value={user.gender} />
          <InfoItem icon={<Ruler size={18} />} label="Height" value={`${user.height} cm`} />
          <InfoItem icon={<Weight size={18} />} label="Weight" value={`${user.weight} kg`} />
          <InfoItem icon={<Heart size={18} />} label="Fitness Goal" value={user.fitnessGoal} />
          <InfoItem icon={<ShieldCheck size={18} />} label="Medical Conditions" value={user.medicalConditions || "None"} />
        </div>

        {/* Emergency Contact */}
        <div className="bg-slate-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2"><AlertTriangle className='text-orange-600' size={18} /> Emergency Contact</h3>
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {user.emergencyName}</p>
            <p><strong>Relation:</strong> {user.emergencyRelation}</p>
            <p><strong>Phone:</strong> {user.emergencyPhone}</p>
          </div>
        </div>

        {/* Aadhar */}
        <div className="pt-4">
          <h3 className="text-lg font-medium mb-2 flex items-center gap-2"><Contact className='text-orange-600' size={18} /> Aadhar Image</h3>
          <img
            src={user.aadharUrl.secure_url}
            alt="Aadhar"
            className="w-full max-w-md rounded-xl border border-slate-800 shadow mx-auto"
          />
        </div>


        {/* Danger Zone */}
        <DeleteButtons accountId={user.userId} id={user.id} />
      </div>
    </div>
  )
}

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-slate-100 bg-slate-900 p-3 rounded-lg">
    <div className="text-orange-600">{icon}</div>
    <div>
      <p className="text-xs uppercase text-slate-300">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
)

export default UserProfileCard
