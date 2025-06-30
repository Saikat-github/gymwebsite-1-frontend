import { useContext, useState } from "react";
import { Dumbbell, Menu, X,   Home,
  CreditCard,
  User,
  Ticket,
BarChart3,} from "lucide-react";
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../context/AuthContext";
import Logout from "./auth/Logout";



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  // const isAuthenticated = true;


  const navItems = [
    {
      name: "Home",
      icon: <Home className="w-4 text-orange-600" />,
      path: "/",
      show: true
    },
        {
      name: "Day Pass",
      path: "/day-pass",
      icon: <Ticket className="w-4 text-orange-600" />,
      show: isAuthenticated
    },
    {
      name: "Plans",
      icon: <BarChart3 className="w-4 text-orange-600" />,
      path: "/plans",
      show: !isAuthenticated
    },
    {
      name: "Pay Online",
      icon: <CreditCard className="w-4 text-orange-600" />,
      path: "/plans",
      show: isAuthenticated
    },
    {
      name: "Profile",
      icon: <User className="w-4 text-orange-600" />,
      path: "/profile",
      show: isAuthenticated
    },
  ]

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-gradient-to-r from-slate-950 via-gray-950 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between">
          <NavLink to={"/"} className="flex items-center">
            <Dumbbell className="h-8 w-8 text-orange-600" />
            <span className="ml-2 text-2xl font-bold text-white">Minimalist Gyms</span>
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex gap-2 items-center text-sm px-1 py-2 hover:border-orange-600 border-b-2 ${isActive ? "border-orange-600 " : "border-transparent"} ${!item.show && "hidden"}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            <Logout isAuthenticated={isAuthenticated} setMobileMenuOpen={setMobileMenuOpen} />
          </div>


          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-orange-600 focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden h-screen">
          <div className="px-2 py-2 space-y-4 sm:px-3 flex flex-col items-center">
            {navItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex gap-2 items-center hover:border-orange-600 border-b-2 ${isActive ? "border-orange-600" : "border-transparent"} ${!item.show && "hidden"}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
            <Logout isAuthenticated={isAuthenticated} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
