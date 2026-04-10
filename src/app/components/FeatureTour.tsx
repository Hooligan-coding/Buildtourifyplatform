import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Check } from 'lucide-react';

interface FeatureTourProps {
  isOpen: boolean;
  onClose: () => void;
}

const tourSteps = [
  {
    title: 'Welcome to Tourify!',
    description: 'Your all-in-one travel companion. Let\'s explore the key features that make your journey safer and smarter.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600',
  },
  {
    title: 'Scan & Translate',
    description: 'Point your camera at any text - menus, signs, documents. Get instant translations with allergen warnings and cultural context.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600',
  },
  {
    title: 'Discover Safely',
    description: 'Find verified hospitals, police stations, restaurants, and attractions. All marked with trust badges and safety ratings.',
    image: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=600',
  },
  {
    title: 'Book with Confidence',
    description: 'Verified drivers and guides only. Live tracking, trip PINs, and emergency features keep you protected.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600',
  },
  {
    title: 'Earn Rewards',
    description: 'Every scan, booking, and review earns you points. Redeem for ride credits, meal vouchers, and premium upgrades.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600',
  },
];

export function FeatureTour({ isOpen, onClose }: FeatureTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep === tourSteps.length - 1) {
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  const step = tourSteps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="fixed inset-4 bg-white rounded-3xl z-50 overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentStep}
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1"
                >
                  <h2 className="text-2xl text-slate-900 mb-3">{step.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 my-6">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? 'w-8 bg-blue-900'
                        : index < currentStep
                        ? 'w-2 bg-emerald-600'
                        : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {currentStep < tourSteps.length - 1 && (
                  <motion.button
                    onClick={handleSkip}
                    className="px-6 py-3 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    Skip
                  </motion.button>
                )}
                <motion.button
                  onClick={handleNext}
                  className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:from-blue-800 hover:to-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>
                    {currentStep === tourSteps.length - 1 ? "Let's Go!" : 'Next'}
                  </span>
                  {currentStep === tourSteps.length - 1 ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
