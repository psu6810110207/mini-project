import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// กำหนด Type ให้ชัดเจน (Strict Typing)
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // เช็ค Token ทุกครั้งที่เข้าเว็บ (Refresh หน้าจอ สถานะต้องไม่หาย)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token); // เก็บ Token ลงเครื่อง
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token'); // ลบ Token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook สำหรับเรียกใช้ AuthContext ง่ายๆ
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};