// src/components/forms/sections/TermsAgreementSection.jsx
import { useNavigate } from 'react-router-dom';

const Agreement = ({ register, errors }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          {...register('terms', {
            required: 'You must agree to the terms and conditions',
          })}
          className="form-checkbox bg-slate-900 outline-none text-indigo-500"
        />
        <p className="ml-2">
          I agree to the{' '}
          <span
            onClick={() => navigate('/termsandcondition')}
            className="text-orange-600 underline cursor-pointer"
          >
            Terms and Conditions
          </span>
        </p>
      </label>
      {errors.terms && (
        <p className="text-red-600 text-xs sm:text-sm">{errors.terms.message}</p>
      )}
    </div>
  );
};

export default Agreement;
