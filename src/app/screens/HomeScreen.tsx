import React from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, Car, Shield, Gift, TrendingUp, Star, ChevronRight, Award, Bell } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { tierRequirements } from '../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { user, addPoints } = useUser();

  const tierInfo = tierRequirements[user.tier];
  const nextTier = user.tier === 'Explorer' ? 'Navigator' : user.tier === 'Navigator' ? 'Elite Traveler' : null;
  const progressToNext = nextTier 
    ? ((user.points - tierInfo.minPoints) / (tierRequirements[nextTier].minPoints - tierInfo.minPoints)) * 100
    : 100;

  const quickActions = [
    { icon: Camera, label: 'Scan & Translate', color: 'bg-blue-900', screen: 'scan' },
    { icon: MapPin, label: 'Discover', color: 'bg-emerald-600', screen: 'discover' },
    { icon: Car, label: 'Book Ride', color: 'bg-blue-800', screen: 'booking' },
    { icon: Shield, label: 'Emergency', color: 'bg-red-600', screen: 'emergency' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <motion.p 
              className="text-blue-200 mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}
            </motion.p>
            <motion.h1 
              className="text-2xl mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {user.name}
            </motion.h1>
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Award className="w-4 h-4" style={{ color: tierInfo.color }} />
              <span className="text-sm">{user.tier}</span>
            </motion.div>
          </div>
          <motion.button
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </div>
          </motion.button>
        </div>

        {/* Points & Tier Progress */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-blue-200 text-sm mb-1">Your Points</p>
              <p className="text-3xl">{user.points.toLocaleString()}</p>
            </div>
            <motion.button
              onClick={() => onNavigate('rewards')}
              className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-emerald-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Gift className="w-4 h-4" />
              Rewards
            </motion.button>
          </div>
          {nextTier && (
            <>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                />
              </div>
              <p className="text-blue-200 text-xs">
                {tierRequirements[nextTier].minPoints - user.points} points to {nextTier}
              </p>
            </>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                onClick={() => onNavigate(action.screen)}
                className={`${action.color} text-white rounded-2xl p-5 flex flex-col items-start gap-3 shadow-lg hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Today's Activity */}
      <div className="px-6 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg text-slate-900">Today's Activity</h3>
          <button className="text-blue-900 text-sm flex items-center gap-1">
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-4 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-900 mb-1">Points Earned Today</p>
              <p className="text-lg text-slate-900">+350 points</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Menu translation</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
              <span className="text-emerald-600 text-sm">+50</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Completed ride</p>
                <p className="text-xs text-slate-500">5 hours ago</p>
              </div>
              <span className="text-emerald-600 text-sm">+150</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-blue-900" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Left verified review</p>
                <p className="text-xs text-slate-500">8 hours ago</p>
              </div>
              <span className="text-emerald-600 text-sm">+100</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Upsell (for free users) */}
      {user.role === 'traveler-free' && (
        <motion.div
          className="mx-6 mt-6 mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" />
            <div className="relative">
              <h3 className="text-xl mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-white/90 mb-4">Priority dispatch, ride credits, and exclusive rewards</p>
              <motion.button
                onClick={() => onNavigate('premium')}
                className="bg-white text-orange-600 px-6 py-2.5 rounded-xl text-sm hover:bg-orange-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="h-24" />
    </div>
  );
}
