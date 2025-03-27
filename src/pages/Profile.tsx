import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { isAuthenticated, getCurrentUserId, getUserById } from '../utils/authUtils';
import { formatCurrency } from '../utils/storageUtils';
import { Wifi, Smartphone, CreditCard, AlertCircle, User, Settings, Shield } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    balance: 0,
    createdAt: '',
  });
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    // Get user data
    const userId = getCurrentUserId();
    if (userId) {
      const user = getUserById(userId);
      if (user) {
        setUserData({
          name: user.name,
          email: user.email,
          balance: user.balance,
          createdAt: user.createdAt,
        });
      }
    }
  }, [navigate]);
  
  // Format date with error handling
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date format error';
    }
  };
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarFallback className="text-3xl bg-banking-primary text-white">
                {userData.name ? userData.name.substring(0, 1) : 'U'}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold mb-2">{userData.name || 'User'}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2">{userData.email || 'No email'}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Member since {formatDate(userData.createdAt)}
            </div>
            <div className="mt-4 text-xl font-semibold">
              Balance: {formatCurrency(userData.balance)}
            </div>
          </div>
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account" className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Manage your account details and personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Full Name</div>
                        <div className="text-gray-500 dark:text-gray-400">{userData.name || 'Not set'}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Email Address</div>
                        <div className="text-gray-500 dark:text-gray-400">{userData.email || 'Not set'}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Smartphone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Phone Number</div>
                        <div className="text-gray-500 dark:text-gray-400">Not set</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Add</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security and privacy settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Two-Factor Authentication</div>
                        <div className="text-red-500">Not enabled</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <AlertCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Password</div>
                        <div className="text-gray-500 dark:text-gray-400">Last changed: Never</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Security Checkup
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Billing Tab */}
            <TabsContent value="billing" className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>Bill Payments</CardTitle>
                  <CardDescription>
                    Manage your recurring bills and payments.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Wifi className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Internet Service</div>
                        <div className="text-gray-500 dark:text-gray-400">Monthly - $65.00</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Pay Now</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Smartphone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Mobile Phone</div>
                        <div className="text-gray-500 dark:text-gray-400">Monthly - $45.00</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Pay Now</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Credit Card</div>
                        <div className="text-gray-500 dark:text-gray-400">Monthly - $250.00</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Pay Now</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Add New Bill
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle>App Settings</CardTitle>
                  <CardDescription>
                    Manage your application preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Notifications</div>
                        <div className="text-gray-500 dark:text-gray-400">All notifications enabled</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Configure</Button>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                      <Languages className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <div className="text-sm font-medium">Language</div>
                        <div className="text-gray-500 dark:text-gray-400">English (US)</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Change</Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Save Preferences
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

// Import missing icons
function Mail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function Languages(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 8 6 6" />
      <path d="m4 14 6-6 2-3" />
      <path d="M2 5h12" />
      <path d="M7 2h1" />
      <path d="m22 22-5-10-5 10" />
      <path d="M14 18h6" />
    </svg>
  );
}

export default Profile;
