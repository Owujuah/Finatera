import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

// Define the initial balance
export const INITIAL_BALANCE = 765620;

// Define the AppUser interface (make sure it matches your Supabase table schema)
export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string; // In production, always store a hashed password!
  createdAt: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
}

// Authentication functions

export const isAuthenticated = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
    return false;
  }
  return data.session !== null;
};

export const getCurrentUserId = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error fetching session:', error);
    return null;
  }
  return data.session?.user.id || null;
};

export const getUserById = async (userId: string): Promise<AppUser | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error || !data) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
  return data;
};

export const logoutUser = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error);
  }
};

// Registration and Login functions

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; userId?: string; error?: string }> => {
  try {
    // Check if the email is already in use
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
      
    if (existingUser) {
      return { success: false, error: 'Email already in use' };
    }

    // Build a new user object
    const newUser: AppUser = {
      id: uuidv4(),
      name,
      email,
      password, // NOTE: In production, hash the password!
      createdAt: new Date().toISOString(),
      cardNumber: generateCardNumber(),
      expiryDate: generateExpiryDate(),
      cvv: generateCVV(),
      balance: INITIAL_BALANCE,
    };

    // Insert the new user into the "users" table and return the inserted row.
    const { data, error } = await supabase
      .from('users')
      .insert(newUser)
      .select() // Request returning data
      .single();

    if (error) {
      console.error('Supabase Insert Error:', JSON.stringify(error, null, 2));
      return { success: false, error: error.message || 'Unknown error' };
    }
    
    const insertedUser = data as AppUser;
    return { success: true, userId: insertedUser.id };
  } catch (error: any) {
    console.error('Registration Catch Error:', error);
    return { success: false, error: error.message || 'Registration failed' };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ success: boolean; userId?: string; error?: string }> => {
  try {
    // Query the "users" table for a matching user
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password) // For demonstration only; do not use plain text passwords in production!
      .single();

    if (error || !users) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    const foundUser = users as AppUser;
    return { success: true, userId: foundUser.id };
  } catch (error: any) {
    return { success: false, error: error.message || 'Login failed' };
  }
};

// Transaction function and helpers

// Import Transaction interface from storageUtils if defined there, otherwise define it here:
export interface Transaction {
  id: string;
  senderId: string;
  receiverName: string;
  receiverAccount: string;
  amount: number;
  date: string;
  type: 'transfer' | 'deposit' | 'withdrawal';
}

export const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('senderId', userId);
  if (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
  return data || [];
};

// Helper functions for card details

export const generateCardNumber = (): string => {
  const prefix = Math.random() > 0.5 ? '4' : '5';
  const numbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10));
  return prefix + numbers.join('');
};

export const generateExpiryDate = (): string => {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() + 2) % 100;
  return `${month}/${year.toString().padStart(2, '0')}`;
};

export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

// Optional: An initialization function if needed
export const initAuth = async (): Promise<void> => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error initializing auth:', error);
  }
  // Additional initialization logic here if needed.
};
