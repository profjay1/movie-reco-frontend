import { createContext, useState } from 'react';
import api from '../api/api.js';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.token);

  const login = async (creds) => {
    const { data } = await api.post('/auth/login', creds);
    localStorage.token = data.token;
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setToken(data.token);
  };

  return (
    <AuthContext.Provider value={{ token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
