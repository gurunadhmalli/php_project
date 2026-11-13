import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Spinner from './Spinner.jsx';

/** Login/register pages: logged-in users are sent to the dashboard. */
export default function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return <Spinner label="Checking your session…" />;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
