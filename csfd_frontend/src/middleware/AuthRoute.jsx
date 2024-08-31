import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/queries';
import Loading from '../components/utils/Loading';
import { useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { isLoading, isFetching, data, error, isSuccess } = useAuth();
  if (isLoading || isFetching) return <Loading message="VERIFYING" />;
  if (error?.message.includes('401') || error?.message.includes('403'))
    return <Navigate to="/signin" replace={true} />;
  if (
    (location.pathname === '/hints' && data?.data !== 'senior') ||
    (location.pathname === '/guess' && data?.data !== 'junior')
  ) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default AuthRoute;
