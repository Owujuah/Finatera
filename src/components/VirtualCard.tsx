
import { useState, useEffect } from 'react';
import { getCurrentUserId, getUserById } from '../utils/authUtils';
import { formatCurrency } from '../utils/storageUtils';

// Helper function to format card number (moved inside component file)
const formatCardNumber = (cardNumber: string): string => {
  const last4 = cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
};

const VirtualCard = ({ simplifiedView = false,  }) => {
  const [balance, setBalance] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [userName, setUserName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState<'visa' | 'mastercard'>('visa');
  
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        setUserName(user.name);
        setCardNumber(user.cardNumber);
        setExpiryDate(user.expiryDate);
        setCvv(user.cvv);
        setBalance(user.balance);
        setCardType(user.cardNumber.startsWith('4') ? 'visa' : 'mastercard');
      }
    }
  }, []);

  

  const toggleCardSide = () => {
    if (!simplifiedView) {
      setShowFront(!showFront);
    }
  };
  
  // Simplified version for dashboard
  if (simplifiedView) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white p-6 shadow-xl card-shine">
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="font-bold text-white text-lg">U</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <p className="text-sm text-white/80 mb-1">Available Balance</p>
                <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Full version with front and back for Cards page
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Card Front */}
      {showFront ? (
        <div 
          className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white p-6 shadow-xl card-shine cursor-pointer"
          onClick={toggleCardSide}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="font-bold text-white text-lg">U</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{formatCurrency(balance)}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-xs font-light opacity-80">Card Number</p>
                <p className="font-mono tracking-wider text-lg">
                  {formatCardNumber(cardNumber)}
                </p>
              </div>
              
              <div className="flex justify-between">
                <div>
                  <p className="text-xs font-light opacity-80">Card Holder</p>
                  <p className="font-medium uppercase tracking-wider">{userName}</p>
                </div>
                <div>
                  <p className="text-xs font-light opacity-80">Expires</p>
                  <p className="font-medium">{expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-6 text-xs opacity-80">
            (Click to flip)
          </div>
        </div>
      ) : (
        // Card Back
        <div 
          className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 text-white p-6 shadow-xl cursor-pointer"
          onClick={toggleCardSide}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="w-full h-10 bg-black mt-4"></div>
            
            <div className="flex flex-col items-end space-y-2">
              <div className="w-3/4 bg-white/20 h-8 rounded-md flex items-center px-2">
                <div className="ml-auto font-mono">{cvv}</div>
              </div>
              <p className="text-xs opacity-80">Security Code</p>
            </div>
            
            <div className="space-y-2">
              <div className="text-center">
                <p className="text-sm">Unity Grande Banking</p>
                <p className="text-xs opacity-80">International Banking Services</p>
              </div>
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="font-bold text-white text-sm">F</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-3 right-6 text-xs opacity-80">
            (Click to flip)
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualCard;
