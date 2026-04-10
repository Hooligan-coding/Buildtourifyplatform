import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, TierLevel } from '../types';
import { mockUser } from '../data/mockData';

interface UserContextType {
  user: User;
  updateUser: (updates: Partial<User>) => void;
  addPoints: (points: number) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(mockUser);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const addPoints = (points: number) => {
    setUser(prev => {
      const newPoints = prev.points + points;
      let newTier: TierLevel = prev.tier;
      
      if (newPoints >= 5000) newTier = 'Elite Traveler';
      else if (newPoints >= 1000) newTier = 'Navigator';
      else newTier = 'Explorer';
      
      return { ...prev, points: newPoints, tier: newTier };
    });
  };

  const switchRole = (role: UserRole) => {
    setUser(prev => ({ ...prev, role }));
  };

  const logout = () => {
    setUser(mockUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addPoints, switchRole, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
