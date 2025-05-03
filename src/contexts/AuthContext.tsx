import React, { useEffect, useState, createContext, useContext } from 'react';
interface UserProfile {
  username: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  profilePicture?: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  changeUsername: (currentPassword: string, newUsername: string) => Promise<boolean>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const defaultUser = {
      username: 'user',
      password: 'admin123!'
    };
    localStorage.setItem('default_user', JSON.stringify(defaultUser));
  }, []);
  const updateProfile = async (data: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev!,
      ...data
    }));
  };
  const changeUsername = async (currentPassword: string, newUsername: string) => {
    const defaultUser = JSON.parse(localStorage.getItem('default_user') || '{}');
    if (currentPassword === defaultUser.password) {
      setUser(prev => ({
        ...prev!,
        username: newUsername
      }));
      return true;
    }
    return false;
  };
  const changePassword = async (currentPassword: string, newPassword: string) => {
    const defaultUser = JSON.parse(localStorage.getItem('default_user') || '{}');
    if (currentPassword === defaultUser.password) {
      localStorage.setItem('default_user', JSON.stringify({
        ...defaultUser,
        password: newPassword
      }));
      return true;
    }
    return false;
  };
  const login = async (username: string, password: string) => {
    const defaultUser = JSON.parse(localStorage.getItem('default_user') || '{}');
    if (username === defaultUser.username && password === defaultUser.password) {
      setIsAuthenticated(true);
      setUser({
        username,
        email: 'admin@example.com',
        profilePicture: undefined,
        fullName: '',
        phoneNumber: ''
      });
      return true;
    }
    return false;
  };
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const register = async (username: string, email: string, password: string) => {
    return true;
  };
  return <AuthContext.Provider value={{
    isAuthenticated,
    user,
    login,
    logout,
    updateProfile,
    changeUsername,
    changePassword
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};