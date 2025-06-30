import { NavLink, useNavigate } from "react-router-dom"
import { signOut } from "../../services/firebase/auth";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { Loader2, LogIn, Power } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";



const Logout = ({ isAuthenticated, setMobileMenuOpen }) => {
    const [loader, setLoader] = useState(false);
    const { setMemberData } = useContext(AuthContext);


    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            setLoader(true);
            const result = await signOut();
            if (result.success) {
                setMemberData(null);
                setMobileMenuOpen(false)
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoader(false)
        }
    };


    return (
        <>
            {
                isAuthenticated
                    ?

                    <button
                        onClick={handleLogOut}
                        className="flex gap-2 items-center px-3 py-2 hover:text-orange-600 cursor-pointer"
                    >
                        <Power className="w-4 text-orange-600" />
                        {loader ? <Loader2 className='w-4 animate-spin' /> : "Logout"}
                    </button>
                    :
                    <NavLink
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex gap-2 items-center px-1 py-1 border-b-2 hover:border-orange-600 text-white mx-auto ${isActive ? "border-orange-600" : "border-transparent"}`
                        }
                    >
                        <LogIn className="w-4 text-orange-600" />
                        Login
                    </NavLink>

            }
        </>
    )
}

export default Logout