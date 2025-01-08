import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage or session)
    const token = localStorage.getItem('token');
    if (token) {
      // You would typically validate the token with your backend here
      setUser({ token }); // For now, just store the token
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Implement your login logic here
      // const response = await loginAPI(credentials);
      // localStorage.setItem('token', response.token);
      // setUser(response.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData) => {
    try {
      // Implement your signup logic here
      // const response = await signupAPI(userData);
      // localStorage.setItem('token', response.token);
      // setUser(response.user);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
