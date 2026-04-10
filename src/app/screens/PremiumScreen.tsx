import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Crown, Zap, Shield, TrendingUp, Star, Gift, Phone } from 'lucide-react';

interface PremiumScreenProps {
  onBack: () => void;
}

export function PremiumScreen({ onBack }: PremiumScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const features = [
    {
      icon: Zap,
      title: 'Priority Dispatch',
      description: 'Skip the queue with instant driver matching',
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Shield,
      title: 'Advanced Safety',
      description: 'Enhanced tracking and 24/7 premium support',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      icon: TrendingUp,
      title: '2x Points Multiplier',
      description: 'Earn double points on every activity',
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Gift,
      title: 'Monthly Ride Credits',
      description: '$50 in ride credits every month',
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
    {
      icon: Star,
      title: 'Exclusive Rewards',
      description: 'Access premium-only reward catalog',
      color: 'text-orange-500',
      bg: 'bg-orange-50',
    },
    {
      icon: Phone,
      title: 'Priority Support',
      description: 'Dedicated support line with instant response',
      color: 'text-pink-500',
      bg: 'bg-pink-50',
    },
  ];

  const plans = {
    monthly: {
      price: 29.99,
      period: 'month',
      savings: null,
    },
    yearly: {
      price: 19.99,
      period: 'month',
      billedAs: 239.88,
      savings: 120,
    },
  };

  const currentPlan = plans[selectedPlan];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 pt-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
        
        <div className="relative">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <div className="text-center">
            <motion.div
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Crown className="w-10 h-10" />
            </motion.div>
            <motion.h1
              className="text-3xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Tourify Premium
            </motion.h1>
            <motion.p
              className="text-lg text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Elevate your travel experience
            </motion.p>
          </div>
        </div>
      </div>

      {/* Plan Selector */}
      <div className="px-6 -mt-16 mb-8">
        <motion.div
          className="bg-white rounded-2xl p-2 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-2 mb-4">
            <motion.button
              onClick={() => setSelectedPlan('monthly')}
              className={`py-4 rounded-xl transition-all ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-sm mb-1">Monthly</p>
              <p className="text-lg">${plans.monthly.price}/mo</p>
            </motion.button>

            <motion.button
              onClick={() => setSelectedPlan('yearly')}
              className={`py-4 rounded-xl transition-all relative ${
                selectedPlan === 'yearly'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save ${plans.yearly.savings}
              </div>
              <p className="text-sm mb-1">Yearly</p>
              <p className="text-lg">${plans.yearly.price}/mo</p>
            </motion.button>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white text-center">
            <p className="text-sm text-white/80 mb-2">Starting at</p>
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl">${currentPlan.price}</span>
              <span className="text-xl text-white/80">/{currentPlan.period}</span>
            </div>
            {selectedPlan === 'yearly' && (
              <p className="text-sm text-white/80">
                Billed ${currentPlan.billedAs} annually
              </p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="px-6 mb-8">
        <h3 className="text-xl text-slate-900 mb-4">Premium Benefits</h3>
        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-4 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${feature.bg}`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                  <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Comparison */}
      <div className="px-6 mb-8">
        <h3 className="text-xl text-slate-900 mb-4">Free vs Premium</h3>
        <motion.div
          className="bg-white rounded-2xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <div className="grid grid-cols-3 bg-slate-50 p-4 text-center text-sm">
            <div />
            <div className="text-slate-600">Free</div>
            <div className="text-amber-600 flex items-center justify-center gap-1">
              <Crown className="w-4 h-4" />
              Premium
            </div>
          </div>

          {[
            { feature: 'Translation scans', free: '10/day', premium: 'Unlimited' },
            { feature: 'Points multiplier', free: '1x', premium: '2x' },
            { feature: 'Ride credits', free: '-', premium: '$50/mo' },
            { feature: 'Priority support', free: false, premium: true },
            { feature: 'Exclusive rewards', free: false, premium: true },
            { feature: 'Safety features', free: 'Basic', premium: 'Advanced' },
          ].map((row, index) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 p-4 text-center text-sm ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
              }`}
            >
              <div className="text-left text-slate-900">{row.feature}</div>
              <div className="text-slate-600">
                {typeof row.free === 'boolean' ? (
                  row.free ? (
                    <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                  ) : (
                    <span className="text-slate-300">-</span>
                  )
                ) : (
                  row.free
                )}
              </div>
              <div className="text-amber-600">
                {typeof row.premium === 'boolean' ? (
                  row.premium ? (
                    <Check className="w-4 h-4 text-amber-600 mx-auto" />
                  ) : (
                    <span className="text-slate-300">-</span>
                  )
                ) : (
                  row.premium
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Testimonials */}
      <div className="px-6 mb-32">
        <h3 className="text-xl text-slate-900 mb-4">What Premium Users Say</h3>
        <div className="space-y-3">
          {[
            {
              name: 'Maria S.',
              role: 'Elite Traveler',
              text: 'The priority dispatch saved me so many times. Worth every penny!',
              rating: 5,
            },
            {
              name: 'James K.',
              role: 'Navigator',
              text: 'Double points made me reach Elite tier in just 3 months.',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white rounded-2xl p-4 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
            >
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-700 mb-3 italic">"{testimonial.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Crown className="w-5 h-5" />
          <span className="text-lg">
            Start {selectedPlan === 'monthly' ? 'Monthly' : 'Annual'} Plan
          </span>
        </motion.button>
        <p className="text-center text-xs text-slate-500 mt-3">
          7-day free trial • Cancel anytime • No commitment
        </p>
      </motion.div>
    </div>
  );
}
