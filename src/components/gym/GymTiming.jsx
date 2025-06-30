import { CalendarCheck, Clock, Dumbbell, HeartPulse } from "lucide-react";

const GymTiming = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Gym Schedule
      </h2>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
        {/* Regular Timings */}
        <div className="p-6 rounded-2xl shadow-lg border border-gray-600 hover:scale-[1.02] transition-all">
          <h3 className="text-lg sm:text-xl font-medium mb-4 flex items-center gap-2 ">
            <Clock size={22} className="text-orange-600"/>
            Mon - Sat
          </h3>
          <p className="text-gray-300">6:00 a.m to 11:30 p.m</p>

          <h3 className="text-lg sm:text-xl font-medium mt-6 mb-2 flex items-center gap-2 ">
            <Clock size={22} className="text-orange-600"/>
            Sunday
          </h3>
          <p className="text-gray-300">6:00 a.m to 5:00 p.m</p>
        </div>


        {/* Yoga Sessions */}
        <div className="p-6 rounded-2xl shadow-lg border border-gray-600 hover:scale-[1.02] transition-all">
          <h3 className="text-lg sm:text-xl font-medium mb-2">🧘 Yoga (Special)</h3>
          <p className="text-gray-300">Wedneday</p>
          <p className="text-gray-300">3:00 p.m to 6:00 p.m</p>

          <h3 className="text-lg sm:text-xl font-medium mt-6 mb-2">🧘‍♀️ Zumba (Special) </h3>
          <p className="text-gray-300">Thursday</p>
          <p className="text-gray-300">3:00 p.m to 6:00 p.m</p>
        </div>
      </div>
    </div>
  );
};

export default GymTiming;
