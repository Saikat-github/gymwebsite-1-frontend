import React, { useContext } from 'react'
import { AlertTriangle, UserX, Trash2 } from 'lucide-react'
import { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import { deleteDocument, deleteUserProfileComplete } from '../../services/firebase/db';
import { deleteUserAccount } from '../../services/firebase/auth';
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';



const DeleteButtons = ({ accountId, id }) => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state
    const [btn, setBtn] = useState(null);
    const navigate = useNavigate()
    const { getMemberInfo } = useContext(AuthContext);


    // Open the modal when delete button is clicked
    const openModal = (id, btnName) => {
        setIsModalOpen(true);
        setBtn(btnName)
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setBtn(null)
    };


    const confirmDelete = async () => {
        try {
            setLoading(true)
            if (btn === "account") {
                if (id) {
                    const result1 = await deleteUserProfileComplete(id, accountId)
                    toast.info(result1.message)
                }
                const result2 = await deleteUserAccount()
                if (result2.success) {
                    toast.success(result2.message)
                    navigate("/login")
                } else {
                    toast.error("Please re-login before deleting your account")
                    navigate("/profile")
                }
            } else {
                const result = await deleteUserProfileComplete(id, accountId)
                if (result.success) {
                    toast.success(result.message)
                } else {
                    toast.error(result.message)
                }
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setTimeout(() => {
                closeModal();
                getMemberInfo();
                setLoading(false);
            }, 1000); // Delay to let toast appear
        }
    }

    return (

        <div className="pt-8 mt-60">
            <hr className='text-red-600 my-10' />
            <h3 className="text-lg font-semibold mb-4 text-red-600 flex items-center gap-2">
                <AlertTriangle size={20} />
                Danger Zone
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
                <button
                    onClick={() => openModal(id, "profile")}
                    className="flex-1 px-4 py-2 text-sm border border-red-800 text-white bg-red-700 rounded hover:bg-red-800 transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <UserX size={16} /> Delete Profile
                </button>
                <button
                    onClick={() => openModal(accountId, "account")}
                    className="flex-1 px-4 py-2 text-sm border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                    <Trash2 size={16} /> Delete Account
                </button>

                {/* Modal for confirmation */}
                <ConfirmationModal
                    btn={btn}
                    isOpen={isModalOpen}
                    onConfirm={confirmDelete} // Handle confirm action
                    onCancel={closeModal}
                    loader={loading} // Handle cancel action
                />
            </div>
        </div>
    )
}

export default DeleteButtons