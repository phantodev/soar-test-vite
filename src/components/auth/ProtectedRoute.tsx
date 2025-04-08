import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  if (!isAuthenticated()) {
    // Redirect to the login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
