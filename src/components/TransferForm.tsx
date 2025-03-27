
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { 
  getCurrentUserId, 
  getUserById 
} from '../utils/authUtils';
import { 
  updateUser, 
  addTransaction,
  formatCurrency 
} from '../utils/storageUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TransferForm = ({ onTransferComplete }: { onTransferComplete: () => void }) => {
  const [receiverName, setReceiverName] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get user balance
    const userId = getCurrentUserId();
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        setBalance(user.balance);
      }
    }
  }, []);
  
  // Handle amount change with formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^0-9.]/g, '');
    
    // Allow only one decimal point
    const parts = value.split('.');
    const formattedValue = parts.length > 2 
      ? `${parts[0]}.${parts.slice(1).join('')}` 
      : value;
    
    setAmount(formattedValue);
    
    // Format for display
    const numValue = parseFloat(formattedValue);
    if (!isNaN(numValue)) {
      setFormattedAmount(formatCurrency(numValue));
    } else {
      setFormattedAmount('');
    }
  };
  
  // Handle transfer
  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = getCurrentUserId();
    if (!userId) {
      toast({
        title: "Authentication Error",
        description: "You need to be logged in to make transfers.",
        variant: "destructive"
      });
      return;
    }
    
    // Get user
    const user = getUserById(userId);
    if (!user) {
      toast({
        title: "User Error",
        description: "Could not find user information.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate inputs
    if (!receiverName || !receiverAccount || !amount) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    const parsedAmount = parseFloat(amount);
    
    // Validate amount
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Amount Error",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if user has enough balance
    if (parsedAmount > user.balance) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this transfer.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate server processing
    setTimeout(() => {
      try {
        // Update user balance
        const updatedUser = {
          ...user,
          balance: user.balance - parsedAmount
        };
        
        updateUser(updatedUser);
        
        // Add transaction
        const transaction = {
          id: uuidv4(),
          senderId: userId,
          receiverName,
          receiverAccount,
          amount: parsedAmount,
          date: new Date().toISOString(),
          type: 'transfer' as const
        };
        
        addTransaction(transaction);
        
        // Reset form
        setReceiverName('');
        setReceiverAccount('');
        setAmount('');
        setFormattedAmount('');
        setBalance(updatedUser.balance);
        
        // Show success message
        toast({
          title: "Transfer Successful",
          description: `You have transferred ${formatCurrency(parsedAmount)} to ${receiverName}.`,
          variant: "default"
        });
        
        // Update parent component
        onTransferComplete();
      } catch (error) {
        console.error('Transfer error:', error);
        toast({
          title: "Transfer Failed",
          description: "An error occurred during the transfer.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };
  
  return (
    <form onSubmit={handleTransfer} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="receiverName">Recipient Name</Label>
        <Input
          id="receiverName"
          placeholder="John Doe"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="receiverAccount">Account Number</Label>
        <Input
          id="receiverAccount"
          placeholder="1234 5678 9012 3456"
          value={receiverAccount}
          onChange={(e) => setReceiverAccount(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <div className="relative">
          <Input
            id="amount"
            placeholder="0.00"
            value={amount}
            onChange={handleAmountChange}
            disabled={isLoading}
            className="w-full pl-6"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            $
          </div>
          {formattedAmount && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
              {formattedAmount}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Available Balance: {formatCurrency(balance)}
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Transfer Funds"}
      </Button>
    </form>
  );
};

export default TransferForm;
