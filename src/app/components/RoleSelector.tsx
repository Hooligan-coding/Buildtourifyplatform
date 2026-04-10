import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Car, Users, Building2, Shield, X } from 'lucide-react';
import { UserRole } from '../types';
import { useUser } from '../context/UserContext';

interface RoleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSelector({ isOpen, onClose }: RoleSelectorProps) {
  const { user, switchRole } = useUser();

  const roles: { id: UserRole; label: string; icon: any; color: string; description: string }[] = [
    {
      id: 'traveler-free',
      label: 'Traveler (Free)',
      icon: User,
      color: 'bg-blue-500',
      description: 'Standard traveler experience',
    },
    {
      id: 'traveler-premium',
      label: 'Traveler (Premium)',
      icon: User,
      color: 'bg-amber-500',
      description: 'Premium features unlocked',
    },
    {
      id: 'driver',
      label: 'Driver',
      icon: Car,
      color: 'bg-emerald-500',
      description: 'Verified driver account',
    },
    {
      id: 'guide',
      label: 'Tour Guide',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Professional tour guide',
    },
    {
      id: 'partner',
      label: 'Partner Business',
      icon: Building2,
      color: 'bg-orange-500',
      description: 'Partner restaurant or venue',
    },
    {
      id: 'admin',
      label: 'Administrator',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Platform administrator',
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-slate-900 mb-1">Switch Role</h2>
                  <p className="text-sm text-slate-500">Demo: View different user perspectives</p>
                </div>
                <motion.button
                  onClick={onClose}
                  className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-slate-900" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {roles.map((role, index) => {
                  const Icon = role.icon;
                  const isActive = user.role === role.id;
                  
                  return (
                    <motion.button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`w-full bg-white rounded-2xl p-4 text-left transition-all ${
                        isActive
                          ? 'ring-2 ring-blue-900 shadow-md'
                          : 'border border-slate-200 hover:border-slate-300'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-slate-900">{role.label}</p>
                            {isActive && (
                              <div className="bg-blue-900 text-white px-2 py-0.5 rounded-full text-xs">
                                Active
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-slate-500">{role.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-900">
                  💡 This is a demo feature. In production, users would have a single assigned role based on account type.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
