import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  useEffect(() => {
    // Initialize animations when component mounts
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        
        if (isVisible) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    // Call once on mount
    animateElements();
    
    // Add scroll listener
    window.addEventListener('scroll', animateElements);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-fade-in">
                Banking made <span className="text-banking-primary">simple</span>, 
                <br />secure and fast.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Experience the future of banking with Finatera. 
                Seamless transfers, real-time tracking, and 
                bank-grade security in the palm of your hand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Login
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center space-x-8 mt-12">
                <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <CheckCircle2 className="text-banking-success h-5 w-5" />
                  <span className="text-sm font-medium">Fast</span>
                </div>
                <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
                  <CheckCircle2 className="text-banking-success h-5 w-5" />
                  <span className="text-sm font-medium">Secure</span>
                </div>
                <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <CheckCircle2 className="text-banking-success h-5 w-5" />
                  <span className="text-sm font-medium">Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Features designed for modern banking</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need to manage your finances in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl p-6 neo-glass animate-on-scroll opacity-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-banking-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Transfers</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Send money instantly to anyone, anywhere in the world with zero fees.
              </p>
            </div>
            
            <div className="rounded-xl p-6 neo-glass animate-on-scroll opacity-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-banking-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced encryption and security protocols keep your money and data safe.
              </p>
            </div>
            
            <div className="rounded-xl p-6 neo-glass animate-on-scroll opacity-0">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-banking-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access your account from anywhere in the world, anytime you need it.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section id="security" className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="max-w-lg animate-on-scroll opacity-0">
                <h2 className="text-3xl font-bold mb-6">Bank-grade security for your peace of mind</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We use advanced encryption and security protocols to keep your money and data safe.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 animate-on-scroll opacity-0">
                    <div className="w-6 h-6 rounded-full bg-banking-success flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">End-to-End Encryption</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        All your data is encrypted from end to end, ensuring that no one can access your information.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 animate-on-scroll opacity-0">
                    <div className="w-6 h-6 rounded-full bg-banking-success flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        An extra layer of security to verify your identity when accessing your account.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 animate-on-scroll opacity-0">
                    <div className="w-6 h-6 rounded-full bg-banking-success flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Fraud Detection</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Advanced algorithms to detect and prevent fraudulent activities in real-time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center animate-on-scroll opacity-0">
              <div className="relative">
                <div className="w-64 h-64 rounded-full bg-blue-100 dark:bg-blue-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-30"></div>
                <div className="neo-glass rounded-3xl p-8 relative">
                  <div className="w-16 h-16 rounded-full bg-banking-primary flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">100% Secure</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your security is our top priority. We use the latest technology to keep your account safe.
                  </p>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-banking-success w-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">About Finatera</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Finatera is a modern banking platform designed to make financial services accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                To provide a simple, secure, and fast banking experience that empowers people to take control of their finances.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                We believe that banking should be accessible to everyone, regardless of their location or financial status.
              </p>
            </div>
            
            <div className="animate-on-scroll opacity-0">
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-banking-primary flex items-center justify-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Transparency</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We believe in being open and honest with our customers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-banking-primary flex items-center justify-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Security</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your security is our top priority. We use the latest technology to keep your account safe.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 rounded-full bg-banking-primary flex items-center justify-center mt-1">
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Innovation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We're constantly innovating to provide the best banking experience possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-banking-primary text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-lg mb-8">
              Join thousands of people who trust Finatera with their banking needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-white w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
