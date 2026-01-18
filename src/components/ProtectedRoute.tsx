import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Sprout, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast(
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white">🌾 Namaste Kisan!</p>
            <p className="text-xs text-white/90 mt-1">Aapko yahan access karne ke liye login karna hoga</p>
          </div>
        </div>,
        {
          action: {
            label: (
              <span className="flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                Login Karein
              </span>
            ),
            onClick: () => navigate('/login'),
          },
          duration: 5000,
          className: "login-required-toast",
        }
      );
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
