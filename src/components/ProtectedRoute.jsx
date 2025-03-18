import { Navigate } from 'react-router-dom';
import { checkAuthStatus } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = checkAuthStatus();

    if (!isAuthenticated) {
        return <Navigate to="/franchise/login" replace />;
    }

    return children;
};

export default ProtectedRoute;