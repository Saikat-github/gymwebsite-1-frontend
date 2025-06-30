import { useForm } from 'react-hook-form';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    handleUpload
} from '../../utils/utilFunctions';
import { AuthContext } from '../../context/AuthContext';
import { addDocument, updateDocument } from '../../services/firebase/db';
import {
    PersonalInfo,
    EmergencyContact,
    MembershipDetails,
    HealthInformation,
    DocumentUpload,
    Agreement,
    SubmitControls
} from './index'; // export all from index.js
import { X } from 'lucide-react';
import { functions } from '../../services/firebase/config';
import { httpsCallable } from 'firebase/functions';





const AdmissionForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [images, setImages] = useState({ imageUrl: "", aadharUrl: "" });
    const [loader, setLoader] = useState(false);
    const [fileLoader, setFileLoader] = useState(false);
    const { user, memberData, getMemberInfo } = useContext(AuthContext);
    const navigate = useNavigate();
    const deleteCloudinaryImage = httpsCallable(functions, 'deleteCloudinaryImage');


    useEffect(() => {
        if (memberData) {
            reset({
                ...memberData,
                terms: memberData.terms || false,
            });
        }
    }, []);



    const handleImageUpload = useCallback(async (name, file) => {
        try {
            setFileLoader(true);
            const key = name === "image" ? "imageUrl" : "aadharUrl";

            // 🔥 Delete old image from Cloudinary if it exists and you're editing
            if (memberData && memberData[key]?.public_id) {
                try {
                    const imageDeletetionRes = await deleteCloudinaryImage({
                        publicId: memberData[key].public_id
                    });
                } catch (deleteError) {
                    console.log("Failed to delete old image:", deleteError);
                }
            }
            

            const result = await handleUpload(file); // returns { secure_url, public_id }
            setImages((prev) => ({
                ...prev,
                [key]: {
                    secure_url: result.secure_url,
                    public_id: result.public_id
                }
            }));
        } catch (err) {
            console.log("Image upload error:", err);
            toast.error(err.message);
        } finally {
            setFileLoader(false);
        }
    }, [memberData]);



    const onSubmit = async (data) => {
        const { image, aadharCard, ...rest } = data;
        try {
            setLoader(true);
            const imageObj = images.imageUrl || memberData?.imageUrl;
            const aadharObj = images.aadharUrl || memberData?.aadharUrl;

            const payload = {
                ...rest,
                imageUrl: imageObj,      // now it's an object: { secure_url, public_id }
                aadharUrl: aadharObj,    // same here
                ...(memberData ? {} : {
                    userId: user.uid,
                    userEmail: user.email,
                    verified: false,
                    role: 'user',
                    membershipStatus: 'inactive'
                })
            };

            const result = memberData
                ? await updateDocument("users", memberData.id, payload)
                : await addDocument("users", payload);

            if (result.success) {
                getMemberInfo();
                toast.success(result.message);
                navigate("/profile");
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="min-h-screen sm:p-6 flex items-center justify-center mb-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-slate-950 p-8 shadow-lg shadow-orange-600 w-full max-w-3xl text-white px-4 sm:px-8 pb-8 rounded-lg space-y-10 max-sm:text-sm relative"
            >
                {memberData && <X className='w-6 text-white absolute right-2 top-2 cursor-pointer' onClick={() => navigate("/profile")} />}
                <h2 className="text-2xl font-bold mb-4 mt-2 text-center text-orange-500">Admission Form</h2>

                <PersonalInfo register={register} errors={errors} />
                <EmergencyContact register={register} errors={errors} />
                <HealthInformation register={register} errors={errors} />
                <DocumentUpload
                    register={register}
                    errors={errors}
                    handleImageUpload={handleImageUpload}
                    images={images}
                    memberData={memberData}
                    fileLoader={fileLoader}
                />
                <Agreement register={register} errors={errors} navigate={navigate} />
                <SubmitControls loader={loader} fileLoader={fileLoader} memberData={memberData} />
            </form>
        </div>
    );
};

export default AdmissionForm;
