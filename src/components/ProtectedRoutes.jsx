// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';



const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { user } = useContext(AuthContext)

    if (!user) {
        // Redirect to sign-in page but save the current location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;