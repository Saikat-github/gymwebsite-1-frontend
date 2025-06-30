import { Navigate, useLocation } from 'react-router-dom';
import { NormalPayment, RazorpayPayment } from '../../components';


const PaymentPage = () => {
  const location = useLocation();
  const { state } = location;
  const { title, price, memberId, navigateTo } = state || {};

  if (!state) {
    return <Navigate to={"/plans"} />
  }

  return (
    <RazorpayPayment title={title} price={price} memberId={memberId} navigateTo={navigateTo} />
  );
};

export default PaymentPage;
