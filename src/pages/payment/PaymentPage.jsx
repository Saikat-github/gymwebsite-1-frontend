import { Navigate, useLocation } from 'react-router-dom';
import { NormalPayment, RazorpayPayment } from '../../components';


const PaymentPage = () => {
  const location = useLocation();
  const { state } = location;


  if (!state) {
    return <Navigate to={"/plans"} />
  }

  return (
    <RazorpayPayment
    {...state}
    />
  );
};

export default PaymentPage;
