
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { 
  getCurrentUserId, 
  getUserTransactions 
} from '../utils/authUtils';
import { 
  formatCurrency, 
  formatDate 
} from '../utils/storageUtils';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  senderId: string;
  receiverName: string;
  receiverAccount: string;
  amount: number;
  date: string;
  type: 'transfer' | 'deposit' | 'withdrawal';
  status?: 'success' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  refreshTrigger?: number;
  filter?: 'all' | 'pending' | 'failed' | 'success';
}

const TransactionHistory = ({ refreshTrigger, filter = 'all' }: TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const userTransactions = getUserTransactions(userId);
      
      // Modify transactions to include status - first one is success, others alternate
      const modifiedTransactions = userTransactions.map((transaction, index) => {
        let status: 'success' | 'pending' | 'failed';
        if (index === 0) {
          status = 'success';
        } else if (index % 2 === 0) {
          status = 'failed';
        } else {
          status = 'pending';
        }
        
        return {
          ...transaction,
          status
        };
      });
      
      // Sort by date in descending order (newest first)
      const sortedTransactions = modifiedTransactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      setTransactions(sortedTransactions);
      
      // Apply status filter if specified
      if (filter !== 'all') {
        const statusFiltered = sortedTransactions.filter(
          transaction => transaction.status === filter
        );
        setFilteredTransactions(statusFiltered);
      } else {
        setFilteredTransactions(sortedTransactions);
      }
    }
  }, [refreshTrigger, filter]);
  
  // Filter transactions when search term changes
  useEffect(() => {
    let filtered = transactions;
    
    // First apply status filter if needed
    if (filter !== 'all') {
      filtered = filtered.filter(transaction => transaction.status === filter);
    }
    
    // Then apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.receiverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.receiverAccount.includes(searchTerm) ||
        transaction.amount.toString().includes(searchTerm) ||
        formatDate(transaction.date).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTransactions(filtered);
  }, [searchTerm, transactions, filter]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Get status badge color
  const getStatusColor = (status?: 'success' | 'pending' | 'failed') => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
      
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{transaction.receiverName}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.receiverAccount.replace(/(\d{4})/g, '$1 ').trim()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <p className="font-semibold text-red-500">-{formatCurrency(transaction.amount)}</p>
                    <Badge variant="outline" className={`${getStatusColor(transaction.status)} text-white`}>
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatDate(transaction.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
