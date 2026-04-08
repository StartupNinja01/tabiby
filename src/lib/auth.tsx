/**
 * auth.tsx — Lightweight localStorage-backed auth context.
 *
 * No backend required. Stores a user object in localStorage so the session
 * survives page refresh. When a real API is added, swap out the
 * login/signup/logout functions and the rest of the app stays the same.
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'patient' | 'provider';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

const STORAGE_KEY = 'tabiby_auth_user';

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function persistUser(user: AuthUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(loadUser);

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    // Simulate a network delay for realism
    await new Promise((r) => setTimeout(r, 400));

    // In production: call POST /api/auth/login and get back a JWT + user object.
    // For now we create a mock user from the email.
    const name = email.split('@')[0];
    const firstName = name.charAt(0).toUpperCase() + name.slice(1).split('.')[0];
    const lastName = (name.split('.')[1] ?? '').charAt(0).toUpperCase() + (name.split('.')[1] ?? '').slice(1);

    const newUser: AuthUser = {
      id: `u_${Date.now()}`,
      firstName: firstName || 'User',
      lastName: lastName || '',
      email,
      phone: '',
      role,
      createdAt: new Date().toISOString(),
    };

    persistUser(newUser);
    setUser(newUser);
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    await new Promise((r) => setTimeout(r, 500));

    const newUser: AuthUser = {
      id: `u_${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: new Date().toISOString(),
    };

    persistUser(newUser);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
