
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, History, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getCurrentUserId } from '../utils/authUtils';

const BottomNav = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    setIsAuth(Boolean(getCurrentUserId()));
  }, [location.pathname]);
  
  // Don't show on landing, login, or signup pages
  if (!isAuth || location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  
  // Only show on mobile
  if (!isMobile) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 neo-glass border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center space-y-1 w-1/4 h-full ${
            location.pathname === '/dashboard'
              ? 'text-banking-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link
          to="/cards"
          className={`flex flex-col items-center justify-center space-y-1 w-1/4 h-full ${
            location.pathname === '/cards'
              ? 'text-banking-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <CreditCard size={20} />
          <span className="text-xs">Cards</span>
        </Link>
        
        <Link
          to="/transactions"
          className={`flex flex-col items-center justify-center space-y-1 w-1/4 h-full ${
            location.pathname === '/transactions'
              ? 'text-banking-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <History size={20} />
          <span className="text-xs">History</span>
        </Link>
        
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center space-y-1 w-1/4 h-full ${
            location.pathname === '/profile'
              ? 'text-banking-primary'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          <User size={20} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
