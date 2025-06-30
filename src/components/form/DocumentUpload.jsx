// src/components/forms/sections/UploadDocumentsSection.jsx
import { Upload, Loader } from 'lucide-react';

const DocumentUpload = ({
  register,
  errors,
  fileLoader,
  handleImageUpload,
  images,
  memberData,
}) => {
  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-lg text-slate-100 sm:text-xl mb-2 flex items-center gap-2">
        <Upload /> Upload Documents {fileLoader && <Loader className="animate-spin" />}
      </h3>

      <div>
        <label className="text-slate-100 text-sm flex items-center gap-2 mb-1">
          Upload your image (Max 1MB)
        </label>
        <input
          type="file"
          accept="image/*"
          className="bg-slate-900 outline-none p-2 rounded w-full text-white"
          {...register('image', {
            required: memberData ? false : 'Image is required',
            validate: images.imageUrl
              ? {
                  fileSize: (file) =>
                    file[0]?.size <= 1 * 1024 * 1024 || 'File size should be under 1MB',
                }
              : undefined,
          })}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload('image', file);
          }}
        />
        {errors.image && (
          <p className="text-red-600 text-xs sm:text-sm">{errors.image.message}</p>
        )}
      </div>

      <div>
        <label className="text-slate-100 text-sm flex items-center gap-2 mb-1">
          Upload your Aadhar card (Max 1MB)
        </label>
        <input
          type="file"
          accept="image/*"
          className="bg-slate-900 outline-none p-2 rounded w-full text-white"
          {...register('aadharCard', {
            required: memberData ? false : 'Aadhar card is required',
            validate: images.aadharUrl
              ? {
                  fileSize: (file) =>
                    file[0]?.size <= 1 * 1024 * 1024 || 'File size should be under 1MB',
                }
              : undefined,
          })}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) handleImageUpload('aadharCard', file);
          }}
        />
        {errors.aadharCard && (
          <p className="text-red-600 text-xs sm:text-sm">{errors.aadharCard.message}</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
