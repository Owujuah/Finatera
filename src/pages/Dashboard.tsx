import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import TransferForm from '@/components/TransferForm';
import TransactionHistory from '@/components/TransactionHistory';
import BottomNav from '@/components/BottomNav';
import VirtualCard from '@/components/VirtualCard';
import { getCurrentUserId, getUserById, isAuthenticated } from '../utils/authUtils';
import { formatCurrency } from '../utils/storageUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState(765620); // Set to $765,620.00
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    } else {
      // Get user name for welcome message
      const userId = getCurrentUserId();
      if (userId) {
        const user = getUserById(userId);
        if (user) {
          setUserName(user.name);
          // We're not setting the balance from the user data anymore
          // as we want to keep it at $765,620.00
        }
      }
    }
  }, [navigate]);
  
  // Handle transfer completion
  const handleTransferComplete = () => {
    setRefreshTrigger(prev => prev + 1);
    // Not updating balance after transfer to keep it at $765,620.00
  };
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Finatera Dashboard</h1>
          <p className="text-lg mt-2 md:mt-0 text-gray-600 dark:text-gray-400">
            Welcome, <span className="font-semibold">{userName}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Balance Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-semibold"></h2>
              </div>
              <VirtualCard simplifiedView={true} />
            </div>
          </div>
          
          {/* Transfer Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Transfer Money</h2>
              <TransferForm onTransferComplete={handleTransferComplete} />
            </div>
          </div>
          
          {/* Transactions Section */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Transactions</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <TransactionHistory refreshTrigger={refreshTrigger} filter="all" />
              </TabsContent>
              
              <TabsContent value="pending" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <TransactionHistory refreshTrigger={refreshTrigger} filter="pending" />
              </TabsContent>
              
              <TabsContent value="failed" className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <TransactionHistory refreshTrigger={refreshTrigger} filter="failed" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
