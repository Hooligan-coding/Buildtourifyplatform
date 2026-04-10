import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Globe, Award, MapPin, ChevronRight, Check } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Shield,
    title: 'Travel with Confidence',
    description: 'Your safety is our priority. Verified drivers, real-time tracking, and emergency assistance at your fingertips.',
    gradient: 'from-blue-900 to-blue-700',
  },
  {
    icon: Globe,
    title: 'Break Language Barriers',
    description: 'AI-powered translation with allergen detection. Scan menus, signs, and documents instantly in 100+ languages.',
    gradient: 'from-emerald-600 to-emerald-500',
  },
  {
    icon: MapPin,
    title: 'Discover with Context',
    description: 'Find verified hospitals, police stations, restaurants, and attractions. Trust in every recommendation.',
    gradient: 'from-blue-800 to-blue-600',
  },
  {
    icon: Award,
    title: 'Earn as You Explore',
    description: 'Get rewarded for every action. Translate, book, review—and unlock exclusive travel benefits.',
    gradient: 'from-emerald-700 to-emerald-500',
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              className={`w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center shadow-2xl`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Content */}
            <motion.h1
              className="text-3xl mb-4 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {slide.title}
            </motion.h1>

            <motion.p
              className="text-lg text-blue-100 mb-12 leading-relaxed px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {slide.description}
            </motion.p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'w-8 bg-emerald-400'
                      : index < currentSlide
                      ? 'w-2 bg-emerald-600'
                      : 'w-2 bg-blue-700'
                  }`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={nextSlide}
              className="w-full bg-white text-blue-900 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-50 transition-colors shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">
                {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
              </span>
              {currentSlide === slides.length - 1 ? (
                <Check className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </motion.button>

            {/* Skip Button */}
            {currentSlide < slides.length - 1 && (
              <motion.button
                onClick={onComplete}
                className="mt-6 text-blue-200 hover:text-white transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Skip
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Branding */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl text-white mb-2">Tourify</h2>
          <p className="text-blue-300 text-sm">Your Travel Operating System</p>
        </motion.div>
      </div>
    </div>
  );
}
