import { supabase } from './supabaseClient';

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

// ---------------------- Users ----------------------

// Get all users
export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) throw error;
  return data as User[];
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return null; // or handle error appropriately
  return data as User;
};

// Add a new user
export const addUser = async (user: User): Promise<void> => {
  const { error } = await supabase.from('users').insert([user]);
  if (error) throw error;
};

// Update a user
export const updateUser = async (updatedUser: User): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .update(updatedUser)
    .match({ id: updatedUser.id });
  if (error) throw error;
};

// ------------------- Transactions -------------------

// Get all transactions
export const getTransactions = async (): Promise<Transaction[]> => {
  const { data, error } = await supabase.from('transactions').select('*');
  if (error) throw error;
  return data as Transaction[];
};

// Get transactions for a specific user
export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('senderId', userId);
  if (error) throw error;
  return data as Transaction[];
};

// Add a new transaction
export const addTransaction = async (transaction: Transaction): Promise<void> => {
  const { error } = await supabase.from('transactions').insert([transaction]);
  if (error) throw error;
};

// ---------------------- Helpers ----------------------

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
