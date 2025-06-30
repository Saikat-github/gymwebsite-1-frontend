import { Link } from "react-router-dom";
import { Ticket, Download } from "lucide-react";




export default function DayPass() {

  return (
    <div className="flex flex-col gap-10 items-center justify-center my-20">
      <Link
        to="/day-pass/buy-passes"
        className="flex items-center gap-2 px-6 py-2 border border-orange-600  hover:bg-orange-600 hover:text-white transition-all duration-200"
      >
        <Ticket className="w-4 h-4" />
        Buy Day-Pass
      </Link>

      <Link
        to="/day-pass/get-passes"
        className="flex items-center gap-2 px-6 py-2 border border-slate-200  bg-slate-100 text-slate-900 transition-all duration-200 hover:bg-slate-300"
      >
        <Download className="w-4 h-4" />
        Your Day-Pass
      </Link>
    </div>
  )


}