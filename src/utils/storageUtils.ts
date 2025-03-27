
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
}

export interface Transaction {
  id: string;
  senderId: string;
  receiverName: string;
  receiverAccount: string;
  amount: number;
  date: string;
  type: 'transfer' | 'deposit' | 'withdrawal';
}

// Get all users
export const getUsers = (): User[] => {
  const users = localStorage.getItem('banking_users');
  return users ? JSON.parse(users) : [];
};

// Save users
export const saveUsers = (users: User[]): void => {
  localStorage.setItem('banking_users', JSON.stringify(users));
};

// Get user by ID
export const getUserById = (id: string): User | null => {
  const users = getUsers();
  return users.find(user => user.id === id) || null;
};

// Add a new user
export const addUser = (user: User): void => {
  const users = getUsers();
  saveUsers([...users, user]);
};

// Update a user
export const updateUser = (updatedUser: User): void => {
  const users = getUsers();
  const updatedUsers = users.map(user => 
    user.id === updatedUser.id ? updatedUser : user
  );
  saveUsers(updatedUsers);
};

// Get all transactions
export const getTransactions = (): Transaction[] => {
  const transactions = localStorage.getItem('banking_transactions');
  return transactions ? JSON.parse(transactions) : [];
};

// Get transactions for a specific user
export const getUserTransactions = (userId: string): Transaction[] => {
  const transactions = getTransactions();
  return transactions.filter(transaction => transaction.senderId === userId);
};

// Add a new transaction
export const addTransaction = (transaction: Transaction): void => {
  const transactions = getTransactions();
  const updatedTransactions = [...transactions, transaction];
  localStorage.setItem('banking_transactions', JSON.stringify(updatedTransactions));
};

// Generate a random card number
export const generateCardNumber = (): string => {
  const prefix = Math.random() > 0.5 ? '4' : '5'; // 4 for Visa, 5 for MasterCard
  const numbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10));
  return prefix + numbers.join('');
};

// Format card number for display (e.g., **** **** **** 1234)
export const formatCardNumber = (cardNumber: string): string => {
  const last4 = cardNumber.slice(-4);
  return `**** **** **** ${last4}`;
};

// Generate expiry date (2 years from now)
export const generateExpiryDate = (): string => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() + 2) % 100;
  return `${month}/${year.toString().padStart(2, '0')}`;
};

// Generate CVV
export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
