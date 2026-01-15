import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. กำหนดหน้าตาของข้อมูล User (มี role เพิ่มเข้ามา)
interface User {
  username: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ แก้ไขตรงนี้: ใช้ { children: any } เพื่อแก้ปัญหาเรื่อง ReactNode กวนใจ
export const AuthProvider = ({ children }: { children: any }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // เช็คว่ามีข้อมูลเก่าค้างอยู่ในเครื่องไหม
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser) as User);
    }
  }, []);

  const login = (username: string) => {
    // ✅ Logic: ถ้าชื่อ admin ให้เป็น admin / ชื่ออื่นเป็น user
    const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
    const userData: User = { username, role };

    localStorage.setItem('token', 'mock-token');
    localStorage.setItem('user', JSON.stringify(userData));
    
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};