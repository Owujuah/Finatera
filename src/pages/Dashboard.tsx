import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import TransferForm from '@/components/TransferForm';
import TransactionHistory from '@/components/TransactionHistory';
import BottomNav from '@/components/BottomNav';
import VirtualCard from '@/components/VirtualCard';
import { getCurrentUserId, getUserById, INITIAL_BALANCE, isAuthenticated } from '../utils/authUtils';
import { formatCurrency } from '../utils/storageUtils';


const Dashboard = () => {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [userName, setUserName] = useState('');
  const [balance, setBalance] = useState(INITIAL_BALANCE); // initial value, will update from DB
  
  // Load user data (including balance) on mount or when refreshTrigger changes
  useEffect(() => {
    const loadUser = async () => {
      const authenticated = await isAuthenticated();
      if (!authenticated) {
        navigate('/Dashboard');
        return;
      }
  
      const userId = await getCurrentUserId();
      if (userId) {
        const user = await getUserById(userId);
        if (user) {
          setUserName(user.name);
          setBalance(user.balance); // update balance from DB
        }
      }
    };
  
    loadUser();
  }, [navigate, refreshTrigger]);
  
  // Handle transfer completion: refresh user data after a transfer
  const handleTransferComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Unity Grande Dashboard</h1>
          <div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Welcome, <span className="font-semibold">{userName}</span>
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Balance Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
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
