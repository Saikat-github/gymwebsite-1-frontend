import { useContext, useEffect, useState } from 'react';
import { SinglePlan } from '../../components';
import { Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';



const MembershipPlans = () => {
  const { plans, loading } = useContext(AuthContext);



  return (
    <div className="py-12 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold ">Membership Plans</h2>
          <p className="mt-4 text-lg flex justify-center items-center gap-2"> Choose the plan that fits your needs</p>
        </div>

        {loading && <Loader2 className='w-6 mx-auto animate-spin' />}


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
          <p className={`text-center text-gray-400 ${loading && "hidden"}`}>No plans found!</p>}

      </div>
    </div>
  );
};

export default MembershipPlans;
