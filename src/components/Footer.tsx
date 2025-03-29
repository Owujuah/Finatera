
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-banking-primary flex items-center justify-center">
                <span className="text-white font-bold"><img src="Images/image 2.png" alt="" /></span>
              </div>
              <span className="font-bold text-xl">Unity Grande</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Fast. Secure. Trusted banking for the modern world.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Unity Grande. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-banking-primary dark:hover:text-banking-secondary transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
