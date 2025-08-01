import React, { useEffect, useState } from 'react';
import { CalendarClock, Loader2 } from 'lucide-react';
import { getDocuments } from '../../services/firebase/db';
import { toast } from 'react-toastify';

const daysOfWeek = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
];

const convertTo12Hour = (time24) => {
  if (!time24) return "00:00 AM";
  let [hour, minute] = time24.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert "0" to "12"
  return `${hour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};



const GymTiming = () => {
  const [savedSchedule, setSavedSchedule] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadFirstSchedule = async () => {
      try {
        setLoader(true);
        const result = await getDocuments("gymSchedule");
        if (result.data[0]) {
          const { createdAt, id, ...rest } = result.data[0];
          setSavedSchedule(rest);
        } else {
          setSavedSchedule({});
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }
    };

    loadFirstSchedule();
  }, []);

  if (loader) {
    return (
      <div className="bg-slate-900 rounded-xl p-6 shadow-lg max-sm:text-sm">
        <Loader2 className='animate-spin w-6 mx-auto' />
      </div>
    );
  }

  return (
    <div className="rounded-xl sm:p-6 p-4 shadow-lg max-sm:text-sm mx-auto border border-gray-600">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
        <h2 className="text-lg sm:text-2xl font-semibold flex sm:items-center gap-2">
          <CalendarClock className="text-orange-600" />
          Gym Schedule
        </h2>
      </div>

      <div className="space-y-4 text-gray-300">
        {daysOfWeek.map((day) => (
          <div key={day} className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <label className="sm:w-28 font-semibold">{day} </label>
            {Object.keys(savedSchedule).length > 0 && savedSchedule[day]
              ? <p><p>
                {convertTo12Hour(savedSchedule[day].open)} to {convertTo12Hour(savedSchedule[day].close)}
              </p>
              </p>
              : <p>00:00 to 00:00</p>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default GymTiming;
