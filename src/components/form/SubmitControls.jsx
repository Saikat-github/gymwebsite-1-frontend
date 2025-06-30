// src/components/forms/sections/SubmitButtonSection.jsx
import { useNavigate } from 'react-router-dom';

const SubmitControls = ({ loader, fileLoader, memberData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 flex-col">
      <button
        disabled={loader || fileLoader}
        type="submit"
        className="w-full bg-orange-600 cursor-pointer p-2 rounded font-bold transition"
      >
        {loader
          ? memberData
            ? 'Updating...'
            : 'Submitting...'
          : memberData
          ? 'Update'
          : 'Submit'}
      </button>

      {memberData && (
        <p
          onClick={() => navigate('/profile')}
          className="w-full bg-orange-600 cursor-pointer p-2 rounded font-bold transition text-center"
        >
          Cancel
        </p>
      )}
    </div>
  );
};

export default SubmitControls;
