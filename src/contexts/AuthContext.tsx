import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  isKycVerified: boolean;
  profileImage?: string;
  documentUrl?: string;
  loginTime?: string;
  createdAt?: string;
  bookingHistory: BookingRecord[];
}

interface BookingRecord {
  id: string;
  serviceName: string;
  date: string;
  status: 'completed' | 'ongoing' | 'cancelled';
  amount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string, userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for existing user
    const storedUser = localStorage.getItem('kisanseva_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (phoneNumber: string, userData: Partial<User> = {}) => {
    const now = new Date().toISOString();
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phoneNumber,
      address: userData.address || '',
      isKycVerified: userData.isKycVerified || false,
      profileImage: userData.profileImage,
      documentUrl: userData.documentUrl,
      loginTime: now,
      createdAt: userData.createdAt || now,
      bookingHistory: userData.bookingHistory || []
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('kisanseva_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kisanseva_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('kisanseva_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};