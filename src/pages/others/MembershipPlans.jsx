import { useEffect, useState } from 'react';
import { SinglePlan } from '../../components';
import { getDocuments } from '../../services/firebase/db';
import { set } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';


const plans = [
  {
    title: 'Day-Pass',
    price: '99', //Don't use ₹ symbol or commas in the price amount, it will cause error in generating UPI QR code
    duration: '1 day',
    features: [
      'All features included',
    ],
  },
  {
    title: 'Monthly',
    price: '999', //Don't use ₹ symbol or commas in the price amount, it will cause error in generating UPI QR code
    duration: '30 days',
    features: [
      'All features included',
    ],
  },
  {
    title: 'Quaterly',
    price: '2499',
    duration: '90 days',
    features: [
      'All features included',
    ],
    discount: "833/month - 16.7% off"
  },
  {
    title: 'Half-yearly',
    price: '4499',
    duration: '180 days',
    features: [
      'All features included',
    ],
    discount: "750/month - 25% off"
  },
  {
    title: 'Yearly',
    price: '5999',
    duration: '365 days',
    features: [
      'All features included',
    ],
    discount: "500/month - 50% off",
    popular: true,
  },
];

const reversedPlans = plans.reverse()

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoader(true);
      const result = await getDocuments('plans');
      if (result.success) {
        setPlans(result.data);
      } else {
        toast.error('Failed to fetch plans');
      }
    } catch (error) {
      toast.error('Error fetching plans: ' + error.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, [])



  return (
    <div className="py-12 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold ">Membership Plans</h2>
          <p className="mt-4 text-lg flex justify-center items-center gap-2"> Choose the plan that fits your needs</p>
        </div>

        {loader && <Loader2 className='w-6 mx-auto animate-spin' />}


        {plans.length > 0
          ?
          <div className="grid md:grid-cols-2 gap-8">
            {
              plans.map((plan, index) => (
                <SinglePlan key={index} plan={plan} />
              ))
            }
          </div>
          :
          <p className={`text-center text-gray-400 ${loader && "hidden"}`}>No plans found!</p>}

      </div>
    </div>
  );
};

export default MembershipPlans;
