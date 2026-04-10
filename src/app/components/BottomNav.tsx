import React from 'react';
import { motion } from 'motion/react';
import { Home, Camera, MapPin, Car, Gift, Settings } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'scan', icon: Camera, label: 'Scan' },
    { id: 'discover', icon: MapPin, label: 'Discover' },
    { id: 'booking', icon: Car, label: 'Rides' },
    { id: 'rewards', icon: Gift, label: 'Rewards' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
                isActive ? 'text-blue-900' : 'text-slate-400'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-900 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
