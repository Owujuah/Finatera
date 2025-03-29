
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';
import { getCurrentUserId, getUserById, logoutUser } from '../utils/authUtils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    navigate('/');
  };
  
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
    
    const userId = getCurrentUserId();
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        setUserName(user.name);
      }
    }
  }, [location.pathname]);
  
  const isAuth = Boolean(getCurrentUserId());
  
  if (!isAuth && location.pathname !== '/') {
    return null;
  }
  
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 neo-glass">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-white font-bold"><img src="/Images/image 2.png" alt="owujuah" /></span>
          </div>
          <span className="font-bold text-xl">Unity Grande</span>
        </Link>
        
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {isAuth ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-teal-500 transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-sm font-medium hover:text-teal-500 transition-colors">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <a href="#features" className="text-sm font-medium hover:text-teal-500 transition-colors">
                  Features
                </a>
                <a href="#security" className="text-sm font-medium hover:text-teal-500 transition-colors">
                  Security
                </a>
                <a href="#about" className="text-sm font-medium hover:text-teal-500 transition-colors">
                  About
                </a>
              </>
            )}
          </nav>
        )}
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {isAuth ? (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-banking-secondary text-white flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium">{userName}</span>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
          
          <button
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 neo-glass py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {isAuth ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium hover:text-teal-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="text-sm font-medium hover:text-teal-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <a 
                  href="#features" 
                  className="text-sm font-medium hover:text-teal-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#security" 
                  className="text-sm font-medium hover:text-teal-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Security
                </a>
                <a 
                  href="#about" 
                  className="text-sm font-medium hover:text-teal-500 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </a>
                <div className="pt-2 flex flex-col space-y-2">
                  <Link 
                    to="/login" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
