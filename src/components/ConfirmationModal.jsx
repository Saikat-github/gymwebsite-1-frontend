import React from "react";
import { Loader2 } from "lucide-react";


const ConfirmationModal = ({ isOpen, onConfirm, onCancel, loader, btn }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70
bg-opacity-50 z-50 mx-2">
      {
        loader
          ?
          <Loader2 className="animate-spin text-red-600 mx-auto w-10 h-10" />
          :
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div className="text-slate-900 text-lgs">
              <h1>If you delete your {btn}, following things will happen</h1>
              {
                btn === "account"
                  ?
                  <div>
                    <div className="text-xs mt-4 space-y-2">
                      <li>All of your <span className="text-red-600">profile data</span> (if any) will be permanently erased</li>
                      <li>Any ongoing <span className="text-red-600">membership plan</span> (if any) will be removed</li>
                      <li>Your complete <span className="text-red-600">account data</span> will be permanently erased from our server</li>
                      <li>You won't be able to recover any of the above data in the future</li>
                    </div>
                  </div>
                  :
                  <div>
                    <div className="text-xs mt-4 space-y-2">
                      <li>All of your profile data (if any) will be permanently erased</li>
                      <li>Any ongoing membership plan (if any) will be removed</li>
                      <li>You won't be able to recover any of the above data in the future</li>
                    </div>
                  </div>
              }
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-slate-800 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
      }

    </div>
  );
};

export default ConfirmationModal;
