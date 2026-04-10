import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Gift, TrendingUp, Award, ChevronRight, Calendar, Star, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { mockRewards, mockTransactions, tierRequirements } from '../data/mockData';
import { Reward } from '../types';

interface RewardsScreenProps {
  onBack: () => void;
}

export function RewardsScreen({ onBack }: RewardsScreenProps) {
  const { user } = useUser();
  const [selectedTab, setSelectedTab] = useState<'rewards' | 'history' | 'tiers'>('rewards');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  const tierInfo = tierRequirements[user.tier];
  const nextTier = user.tier === 'Explorer' ? 'Navigator' : user.tier === 'Navigator' ? 'Elite Traveler' : null;
  const progressToNext = nextTier 
    ? ((user.points - tierInfo.minPoints) / (tierRequirements[nextTier].minPoints - tierInfo.minPoints)) * 100
    : 100;

  const handleRedeem = (reward: Reward) => {
    if (user.points >= reward.pointsCost) {
      setRedeemed(true);
      setTimeout(() => {
        setRedeemed(false);
        setSelectedReward(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 pt-12 pb-8 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-2xl mb-1">Rewards</h2>
            <p className="text-blue-200 text-sm">Earn and redeem points</p>
          </div>
        </div>

        {/* Points Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-200 text-sm mb-1">Available Points</p>
              <p className="text-4xl">{user.points.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full mb-2">
                <Award className="w-4 h-4" style={{ color: tierInfo.color }} />
                <span className="text-sm">{user.tier}</span>
              </div>
              {nextTier && (
                <p className="text-xs text-blue-200">
                  {tierRequirements[nextTier].minPoints - user.points} to {nextTier}
                </p>
              )}
            </div>
          </div>

          {nextTier && (
            <div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl p-1.5 shadow-sm flex gap-1">
          {[
            { id: 'rewards', label: 'Rewards', icon: Gift },
            { id: 'history', label: 'History', icon: TrendingUp },
            { id: 'tiers', label: 'Tiers', icon: Award },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-blue-900 text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6"
          >
            <h3 className="text-lg text-slate-900 mb-4">Available Rewards</h3>
            <div className="grid grid-cols-1 gap-4 mb-24">
              {mockRewards.map((reward, index) => {
                const canAfford = user.points >= reward.pointsCost;
                return (
                  <motion.button
                    key={reward.id}
                    onClick={() => setSelectedReward(reward)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative h-32">
                      <img
                        src={reward.image}
                        alt={reward.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-lg mb-1">{reward.title}</p>
                        <div className="flex items-center gap-2">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                            {reward.pointsCost} points
                          </span>
                          <span className="bg-emerald-500/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                            ${reward.value} value
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-slate-600 mb-3">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${canAfford ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {canAfford ? 'You can redeem this' : `Need ${reward.pointsCost - user.points} more points`}
                        </span>
                        <ChevronRight className={`w-5 h-5 ${canAfford ? 'text-blue-900' : 'text-slate-300'}`} />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {selectedTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6"
          >
            <h3 className="text-lg text-slate-900 mb-4">Points History</h3>
            <div className="space-y-3 mb-24">
              {mockTransactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      transaction.type === 'earn' ? 'bg-emerald-50' : 'bg-orange-50'
                    }`}>
                      {transaction.type === 'earn' ? (
                        <TrendingUp className="w-6 h-6 text-emerald-600" />
                      ) : (
                        <Gift className="w-6 h-6 text-orange-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-slate-900 mb-1">{transaction.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>{transaction.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-lg ${
                        transaction.type === 'earn' ? 'text-emerald-600' : 'text-orange-600'
                      }`}>
                        {transaction.type === 'earn' ? '+' : ''}{transaction.points}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">{transaction.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedTab === 'tiers' && (
          <motion.div
            key="tiers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-6"
          >
            <h3 className="text-lg text-slate-900 mb-4">Membership Tiers</h3>
            <div className="space-y-4 mb-24">
              {Object.entries(tierRequirements).map(([tier, info], index) => {
                const isCurrentTier = tier === user.tier;
                const isUnlocked = user.points >= info.minPoints;
                
                return (
                  <motion.div
                    key={tier}
                    className={`bg-white rounded-2xl p-6 shadow-sm ${
                      isCurrentTier ? 'ring-2 ring-blue-900' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${info.color}20` }}
                        >
                          <Award className="w-6 h-6" style={{ color: info.color }} />
                        </div>
                        <div>
                          <h4 className="text-slate-900 mb-1">{tier}</h4>
                          <p className="text-sm text-slate-500">
                            {info.minPoints === 0 ? '0' : info.minPoints.toLocaleString()}
                            {info.maxPoints === Infinity ? '+' : ` - ${info.maxPoints.toLocaleString()}`} points
                          </p>
                        </div>
                      </div>
                      {isCurrentTier && (
                        <div className="bg-blue-900 text-white px-3 py-1 rounded-full text-xs">
                          Current
                        </div>
                      )}
                      {isUnlocked && !isCurrentTier && (
                        <Check className="w-5 h-5 text-emerald-600" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {tier === 'Explorer' && 'Basic translation features'}
                        {tier === 'Navigator' && 'Priority support & ride credits'}
                        {tier === 'Elite Traveler' && 'VIP access & exclusive rewards'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {tier === 'Explorer' && 'Standard booking access'}
                        {tier === 'Navigator' && 'Advanced safety features'}
                        {tier === 'Elite Traveler' && 'Concierge service available'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {tier === 'Explorer' && 'Points earning enabled'}
                        {tier === 'Navigator' && '2x points on all activities'}
                        {tier === 'Elite Traveler' && '3x points multiplier'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reward Detail Modal */}
      <AnimatePresence>
        {selectedReward && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !redeemed && setSelectedReward(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-40 max-h-[80vh] overflow-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="p-6">
                <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6" />
                
                {redeemed ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl text-slate-900 mb-2">Redeemed!</h3>
                    <p className="text-slate-600">Check your email for details</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                      <img
                        src={selectedReward.image}
                        alt={selectedReward.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h2 className="text-2xl mb-2">{selectedReward.title}</h2>
                        <div className="flex items-center gap-2">
                          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                            {selectedReward.pointsCost} points
                          </span>
                          <span className="bg-emerald-500/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm">
                            ${selectedReward.value} value
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {selectedReward.description}
                    </p>

                    {selectedReward.expiryDate && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-6">
                        <div className="flex items-center gap-2 text-orange-800">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
                            Valid until {selectedReward.expiryDate.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-500 mb-1">Your Points</p>
                          <p className="text-2xl text-slate-900">{user.points.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500 mb-1">Required</p>
                          <p className="text-2xl text-slate-900">{selectedReward.pointsCost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => handleRedeem(selectedReward)}
                      disabled={user.points < selectedReward.pointsCost}
                      className={`w-full py-4 rounded-2xl text-white transition-all ${
                        user.points >= selectedReward.pointsCost
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600'
                          : 'bg-slate-300 cursor-not-allowed'
                      }`}
                      whileHover={user.points >= selectedReward.pointsCost ? { scale: 1.02 } : {}}
                      whileTap={user.points >= selectedReward.pointsCost ? { scale: 0.98 } : {}}
                    >
                      {user.points >= selectedReward.pointsCost
                        ? 'Redeem Reward'
                        : `Need ${selectedReward.pointsCost - user.points} more points`
                      }
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
