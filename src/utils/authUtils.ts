
import { v4 as uuidv4 } from 'uuid';
import { addUser, getUserById as getStorageUserById, getUsers, getUserTransactions as getStorageUserTransactions } from './storageUtils';

// Define the User interface to match the one in storageUtils
interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Explicitly include password in this interface
  createdAt: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
}

// Default initial balance for new users
const INITIAL_BALANCE = 765620;

// Current authenticated user
let currentUser: string | null = null;

// Load the authenticated user from session storage
export const loadAuthUser = (): string | null => {
  const userId = sessionStorage.getItem('banking_auth_user');
  currentUser = userId;
  return userId;
};

// Save the authenticated user to session storage
export const saveAuthUser = (userId: string): void => {
  sessionStorage.setItem('banking_auth_user', userId);
  currentUser = userId;
};

// Clear the authenticated user from session storage
export const clearAuthUser = (): void => {
  sessionStorage.removeItem('banking_auth_user');
  currentUser = null;
};

// Get the current authenticated user ID
export const getCurrentUserId = (): string | null => {
  if (currentUser) return currentUser;
  return loadAuthUser();
};

// Export getUserById
export const getUserById = (userId: string): User | null => {
  return getStorageUserById(userId);
};

// Export getUserTransactions
export const getUserTransactions = (userId: string) => {
  return getStorageUserTransactions(userId);
};

// Register a new user
export const registerUser = (name: string, email: string, password: string): { success: boolean; userId?: string; error?: string } => {
  try {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return { success: false, error: 'Email already in use' };
    }
    
    // Generate a unique ID
    const userId = uuidv4();
    
    // Generate card details
    const cardNumber = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
    const expiryDate = (() => {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = (date.getFullYear() + 2) % 100;
      return `${month}/${year.toString().padStart(2, '0')}`;
    })();
    const cvv = Math.floor(Math.random() * 900 + 100).toString();
    
    // Create a new user
    const newUser = {
      id: userId,
      name,
      email,
      password, // In a real app, this should be hashed
      createdAt: new Date().toISOString(),
      cardNumber,
      expiryDate,
      cvv,
      balance: INITIAL_BALANCE
    };
    
    // Add the user to storage
    addUser(newUser);
    
    // Save the authenticated user
    saveAuthUser(userId);
    
    return { success: true, userId };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// Login a user
export const loginUser = (email: string, password: string): { success: boolean; userId?: string; error?: string } => {
  try {
    const users = getUsers();
    
    // Find the user with the provided email and password
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    // Save the authenticated user
    saveAuthUser(user.id);
    
    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

// Logout the current user
export const logoutUser = (): void => {
  clearAuthUser();
};

// Check if a user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUserId() !== null;
};

// Initialize authentication on page load
export const initAuth = (): void => {
  loadAuthUser();
};
