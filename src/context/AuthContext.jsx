import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user data on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, we would make an API call here
      // For now, we'll simulate a successful login with mock data
      const response = {
        user: {
          id: '123',
          name: 'Demo User',
          email: email
        },
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      // In a real app, we would make an API call here
      // For now, we'll simulate a successful registration with mock data
      const response = {
        user: {
          id: '123',
          name: name,
          email: email
        },
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;