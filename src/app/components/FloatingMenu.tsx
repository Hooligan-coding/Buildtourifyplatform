import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Settings, User, LogOut, HelpCircle, X } from 'lucide-react';

interface FloatingMenuProps {
  onEmergency: () => void;
  onSettings: () => void;
}

export function FloatingMenu({ onEmergency, onSettings }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Shield, label: 'Emergency', color: 'bg-red-500', action: onEmergency },
    { icon: Settings, label: 'Settings', color: 'bg-blue-900', action: onSettings },
    { icon: User, label: 'Profile', color: 'bg-purple-500', action: () => {} },
    { icon: HelpCircle, label: 'Help', color: 'bg-emerald-500', action: () => {} },
  ];

  return (
    <>
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full shadow-2xl flex items-center justify-center z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-50" />
            <Settings className="w-6 h-6 text-white relative" />
          </div>
        )}
      </motion.button>

      {/* Menu Items */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Buttons */}
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className={`fixed ${item.color} rounded-full shadow-lg flex items-center gap-3 px-4 py-3 z-40 text-white`}
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: 1,
                    x: -20,
                    y: -(60 * (index + 1)),
                  }}
                  exit={{ scale: 0, x: 0, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ right: '24px', bottom: '96px' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                </motion.button>
              );
            })}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
