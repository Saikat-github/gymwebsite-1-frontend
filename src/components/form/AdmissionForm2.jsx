import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    User, ShieldCheck, Dumbbell, ClipboardList, ExternalLink, Upload,
    Loader,
    X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleUpload, validateFileSize } from '../../utils/utilFunctions';
import { AuthContext } from '../../context/AuthContext';
import { addDocument, updateDocument } from '../../services/firebase/db';


const AdmissionForm = () => {
    const [images, setImages] = useState({ imageUrl: "", aadharUrl: "" });
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [fileLoader, setFileLoader] = useState(false);
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const { user, memberData, getMemberInfo } = useContext(AuthContext);


    useEffect(() => {
        if (memberData) {
            reset({
                firstName: memberData.firstName || "",
                lastName: memberData.lastName || "",
                dob: memberData.dob || "",
                phone: memberData.phone || "",
                emergencyName: memberData.emergencyName || "",
                emergencyRelation: memberData.emergencyRelation || "",
                emergencyPhone: memberData.emergencyPhone || "",
                membershipType: memberData.membershipType || "",
                paymentMethod: memberData.paymentMethod || "",
                weight: memberData.weight || "",
                height: memberData.height || "",
                medicalConditions: memberData.medicalConditions || "",
                fitnessGoal: memberData.fitnessGoal || "",
                terms: memberData.terms || false,
            })
        }
    }, [])


    const handleImageUpload = useCallback(async (name, file) => {
        try {
            setFileLoader(true);
            const url = await handleUpload(file);
            if (name === "image") {
                setImages((prev) => ({ ...prev, imageUrl: url }));
            } else {
                setImages((prev) => ({ ...prev, aadharUrl: url }));
            }
        } catch (error) {
            toast.error(error.message || "An error occurred while uploading the file");
        } finally {
            setFileLoader(false);
        }
    }, []);


    const onSubmit = async (data) => {
        const { image, aadharCard, ...otherData } = data
        try {
            setLoader(true);
            let result;
            if (memberData) {
                result = await updateDocument("users", memberData.id, {
                    ...otherData
                })
            } else {
                result = await addDocument("users", {
                    ...otherData,
                    imageUrl: images.imageUrl,
                    aadharUrl: images.aadharUrl,
                    userId: user.uid,
                    userEmail: user.email,
                    verified: false,
                })
            }

            if (result.success) {
                getMemberInfo()
                toast.success(result.message);
                navigate("/profile");
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoader(false)
        }
    };


    return (
        <div className="min-h-screen sm:p-6 flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("Validation errors:", errors);
                })
                }
                className=" p-8 border border-orange-600 w-full max-w-3xl text-white px-4 sm:px-8 pb-8 rounded-lg space-y-10 max-sm:text-sm relative"
            >
                {memberData && <X className='w-6 text-white absolute right-2 top-2 cursor-pointer' onClick={() => navigate("/profile")} />}
                <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-orange-500">Admission Form</h2>

                {/* Personal Information */}
                <div>
                    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><User size={20} /> Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input {...register("firstName", { required: "First name is required" })} placeholder="First Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.firstName && <p className="text-red-600 text-xs sm:text-sm">{errors.firstName.message}</p>}
                        </div>
                        <div>
                            <input {...register("lastName", { required: "Last name is required" })} placeholder="Last Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.lastName && <p className="text-red-600 text-xs sm:text-sm">{errors.lastName.message}</p>}
                        </div>
                        <div>
                            <input {...register("dob", { required: "Date of birth is required" })} type="date" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.dob && <p className="text-red-600 text-xs sm:text-sm">{errors.dob.message}</p>}
                        </div>
                        <div>
                            <input {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit Indian phone number",
                                },
                            })}
                                type="tel"
                                placeholder="Phone Number"
                                className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.phone && <p className="text-red-600 text-xs sm:text-sm">{errors.phone.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div>
                    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><ShieldCheck size={20} /> Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input {...register("emergencyName")} placeholder="Contact Name" className="bg-slate-900 outline-none p-2 rounded w-full" />
                        </div>
                        <div>
                            <input {...register("emergencyRelation")} placeholder="Relationship" className="bg-slate-900 outline-none p-2 rounded w-full" />
                        </div>
                        <div>
                            <input {...register("emergencyPhone",
                                {
                                    required: "Emergency phone is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message: "Enter a valid 10-digit Indian phone number",
                                    },
                                })}
                                type="tel"
                                placeholder="Phone Number" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.emergencyPhone && <p className="text-red-600 text-xs sm:text-sm">{errors.emergencyPhone.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Membership Details */}
                <div>
                    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><ClipboardList size={20} /> Membership Details</h3>
                    <p onClick={() => navigate("/plans")} className='flex items-center gap-1 text-orange-600 text-sm cursor-pointer'>See Our Latest Plans <ExternalLink className='w-4' /></p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <select {...register("membershipType", { required: "Membership type is required" })} className="bg-slate-900 outline-none p-2 rounded w-full">
                                <option value="">Select Membership Type</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Half-yearly">Half-yearly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
                            {errors.membershipType && <p className="text-red-600 text-xs sm:text-sm">{errors.membershipType.message}</p>}
                        </div>
                        <div>
                            <select {...register("paymentMethod", { required: "Payment method is required" })} className="bg-slate-900 outline-none p-2 rounded w-full">
                                <option value="">Select Payment Method</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline</option>
                            </select>
                            {errors.paymentMethod && <p className="text-red-600 text-xs sm:text-sm">{errors.paymentMethod.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Health Info */}
                <div className='space-y-2'>
                    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><Dumbbell size={20} /> Health Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <input {...register("weight", { required: "Weight is required" })} type="number" placeholder="Weight (kg)" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.weight && <p className="text-red-600 text-xs sm:text-sm">{errors.weight.message}</p>}
                        </div>
                        <div>
                            <input {...register("height", { required: "Height is required" })} type="number" placeholder="Height (cm)" className="bg-slate-900 outline-none p-2 rounded w-full" />
                            {errors.height && <p className="text-red-600 text-xs sm:text-sm">{errors.height.message}</p>}
                        </div>
                    </div>
                    <textarea {...register("medicalConditions")} placeholder="Medical Conditions (if any)" className="bg-slate-900 outline-none p-2 rounded w-full"></textarea>
                    <div>
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


                {/* File Uploads */}
                <div className="space-y-4 text-sm">
                    <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2"><Upload />Upload Documents{fileLoader && <Loader className='animate-spin' />}</h3>
                    <div>
                        <label className="text-slate-100 text-sm flex items-center gap-2 mb-1">Upload your image (Max 1MB) </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="bg-slate-900 outline-none p-2 rounded w-full text-white"
                            {...register("image", {
                                required: memberData ? false : "Image is required",
                                // validate: {
                                //     fileSize: (file) => validateFileSize(file[0], 1) || "File size should be under 1MB"
                                // }
                            })}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleImageUpload("image", file)
                            }}
                        />
                        {errors.image && <p className="text-red-600 text-xs sm:text-sm">{errors.image.message}</p>}
                    </div>

                    <div>
                        <label className="text-slate-100 text-sm flex items-center gap-2 mb-1">Upload your aadhar card (Max 1MB) </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="bg-slate-900 outline-none p-2 rounded w-full text-white"
                            {...register("aadharCard", {
                                required: memberData ? false : "Aadhar card is required",
                                // validate: {
                                //     fileSize: (file) => validateFileSize(file[0], 1) || "File size should be under 1MB"
                                // }
                            })}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleImageUpload("aadharCard", file)
                            }}
                        />
                        {errors.aadharCard && <p className="text-red-600 text-xs sm:text-sm">{errors.aadharCard.message}</p>}
                    </div>
                </div>


                {/* Agreement */}
                <div className="space-y-2">
                    <label className="inline-flex items-center">
                        <input type="checkbox" {...register("terms", { required: "You must agree to the terms and conditions" })} className="form-checkbox bg-slate-900 outline-none text-indigo-500" />
                        <p className="ml-2">I agree to the <span onClick={() => navigate("/termsandcondition")} className="text-orange-600 underline cursor-pointer">Terms and Conditions</span></p>
                    </label>
                    {errors.terms && <p className="text-red-600 text-xs sm:text-sm">{errors.terms.message}</p>}
                </div>
                <div className='flex gap-2 flex-col'>
                    <button
                        disabled={loader || fileLoader}
                        type="submit"
                        className="w-full bg-orange-600 cursor-pointer p-2 rounded font-bold transition"
                    >
                        {loader ? (memberData ? "Updating..." : "Submitting...") : (memberData ? "Update" : "Submit")}
                    </button>

                    {
                        memberData
                        &&
                        <p
                            onClick={() => navigate("/profile")}
                            className="w-full bg-orange-600 cursor-pointer p-2 rounded font-bold transition text-center"
                        >
                            Cancel
                        </p>
                    }
                </div>
            </form>
        </div>
    );
};

export default AdmissionForm;