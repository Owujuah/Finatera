
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import VirtualCard from '@/components/VirtualCard';
import BottomNav from '@/components/BottomNav';
import { isAuthenticated } from '../utils/authUtils';

const Cards = () => {
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Card</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your Finatera card
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <VirtualCard />
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Cards;
