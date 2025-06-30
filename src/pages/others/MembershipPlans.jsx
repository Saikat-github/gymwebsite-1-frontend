import { SinglePlan } from '../../components';


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
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold ">Membership Plans</h2>
          <p className="mt-4 text-lg flex justify-center items-center gap-2"> Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reversedPlans.map(({ title, price, duration, features, popular, discount }, index) => (
            <SinglePlan title={title} price={price} duration={duration} features={features} popular={popular} discount={discount} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
