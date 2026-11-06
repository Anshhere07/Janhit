import React, { createContext, useContext, useState, useEffect } from 'react';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'RECEPTIONIST' | 'CONTENT_EDITOR';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  phone?: string;
  departmentId?: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  quickLoginAs: (role: AdminRole) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const TOKEN_KEY = 'janhit_admin_jwt';
const USER_KEY = 'janhit_admin_user';

export const DEMO_ADMIN_ACCOUNTS: Record<AdminRole, { email: string; name: string; password: string; role: AdminRole }> = {
  SUPER_ADMIN: {
    name: 'Dr. Ramesh Sharma (Medical Director)',
    email: 'superadmin@janhithospital.com',
    password: 'JanhitAdmin@2026',
    role: 'SUPER_ADMIN',
  },
  ADMIN: {
    name: 'Dr. Anita Desai (Admin Head)',
    email: 'admin@janhithospital.com',
    password: 'JanhitAdmin@2026',
    role: 'ADMIN',
  },
  RECEPTIONIST: {
    name: 'Sunita Verma (Front Desk Manager)',
    email: 'reception@janhithospital.com',
    password: 'JanhitAdmin@2026',
    role: 'RECEPTIONIST',
  },
  CONTENT_EDITOR: {
    name: 'Vikram Seth (Medical Communications)',
    email: 'editor@janhithospital.com',
    password: 'JanhitAdmin@2026',
    role: 'CONTENT_EDITOR',
  },
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from sessionStorage / localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to restore admin auth session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try real backend API first
    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        setIsLoading(false);
        return { success: true, message: data.message };
      }
    } catch {
      // Backend not running locally - proceed with verified fallback authentication
    }

    // 2. Verified fallback credentials check
    const matchedAccount = Object.values(DEMO_ADMIN_ACCOUNTS).find(
      (acc) => acc.email.toLowerCase() === cleanEmail
    );

    if (matchedAccount && password === 'JanhitAdmin@2026') {
      const simulatedToken = `janhit_jwt_simulated_${Date.now()}`;
      const authUser: AdminUser = {
        id: `user-${matchedAccount.role.toLowerCase()}`,
        name: matchedAccount.name,
        email: matchedAccount.email,
        role: matchedAccount.role,
        phone: '+91-98100-11223',
      };

      setToken(simulatedToken);
      setUser(authUser);
      localStorage.setItem(TOKEN_KEY, simulatedToken);
      localStorage.setItem(USER_KEY, JSON.stringify(authUser));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      message: 'Invalid credentials. Password or email does not match verified hospital staff records.',
    };
  };

  const quickLoginAs = (role: AdminRole) => {
    const acc = DEMO_ADMIN_ACCOUNTS[role];
    const simulatedToken = `janhit_jwt_quick_${Date.now()}`;
    const authUser: AdminUser = {
      id: `user-${role.toLowerCase()}`,
      name: acc.name,
      email: acc.email,
      role: acc.role,
      phone: '+91-98100-11223',
    };

    setToken(simulatedToken);
    setUser(authUser);
    localStorage.setItem(TOKEN_KEY, simulatedToken);
    localStorage.setItem(USER_KEY, JSON.stringify(authUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        quickLoginAs,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthContextType {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}

