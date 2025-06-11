import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthUser } from '@/types';
import { mockUsers } from '@/utils/mockData';

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
  fullName: string;
  phone?: string;
  city?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('sooq_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('sooq_user');
      }
      setIsLoading(false);
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in production, this would be a real API call
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (foundUser && password === 'password') { // Mock password check
        const authUser: AuthUser = {
          id: foundUser.id,
          email: foundUser.email,
          isAuthenticated: true,
          profile: foundUser,
        };
        
        setUser(authUser);
        localStorage.setItem('sooq_user', JSON.stringify(authUser));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration - in production, this would be a real API call
      const existingUser = mockUsers.find(u => u.email === userData.email || u.username === userData.username);
      
      if (existingUser) {
        setIsLoading(false);
        return false; // User already exists
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        username: userData.username,
        fullName: userData.fullName,
        phone: userData.phone,
        city: userData.city,
        badges: [],
        reputationScore: 0,
        totalSubmissions: 0,
        accurateSubmissions: 0,
        isVerified: false,
        isAdmin: false,
        isBanned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const authUser: AuthUser = {
        id: newUser.id,
        email: newUser.email,
        isAuthenticated: true,
        profile: newUser,
      };
      
      // Store new user (in production, this would be saved in database)
      mockUsers.push(newUser);
      
      setUser(authUser);
      localStorage.setItem('sooq_user', JSON.stringify(authUser));
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sooq_user');
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
