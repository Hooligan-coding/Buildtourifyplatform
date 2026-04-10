import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Zap, AlertTriangle, Info, ChevronDown, Languages, Sparkles } from 'lucide-react';

interface ScanScreenProps {
  onBack: () => void;
}

const mockTranslation = {
  originalText: 'Poulet rôti aux herbes de Provence avec légumes grillés',
  translatedText: 'Roasted chicken with Provence herbs and grilled vegetables',
  sourceLanguage: 'French',
  targetLanguage: 'English',
  confidence: 0.96,
  allergens: ['Dairy', 'Garlic'],
  ingredients: [
    'Free-range chicken',
    'Thyme',
    'Rosemary',
    'Lavender',
    'Butter',
    'Zucchini',
    'Bell peppers',
    'Eggplant',
    'Garlic',
  ],
  culturalNotes: 'Herbes de Provence is a traditional blend from southeastern France, typically containing thyme, basil, rosemary, and lavender. This dish represents classic French countryside cuisine.',
  history: 'This recipe dates back to 18th century Provence, where local farmers would roast chickens with wild herbs growing in the Mediterranean hills.',
};

export function ScanScreen({ onBack }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [showDetails, setShowDetails] = useState({ ingredients: false, cultural: false });

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
          <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex items-center gap-2 text-white text-sm">
              <Languages className="w-4 h-4" />
              <span>FR → EN</span>
            </div>
          </div>
        </div>

        {/* Camera View */}
        <div className="relative h-[60vh] bg-slate-800 overflow-hidden">
          {!hasScanned ? (
            <>
              {/* Simulated Camera Feed */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
              
              {/* Scan Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-[85%] h-48 border-2 border-white/50 rounded-2xl relative"
                  animate={{ 
                    borderColor: isScanning ? 'rgba(16, 185, 129, 0.8)' : 'rgba(255, 255, 255, 0.5)' 
                  }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-lg" />

                  {/* Scanning line */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                        initial={{ top: 0 }}
                        animate={{ top: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Help text */}
                  {!isScanning && (
                    <motion.p
                      className="absolute inset-0 flex items-center justify-center text-white/70 text-sm text-center px-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Position text within the frame
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Scan Button */}
              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <motion.button
                  onClick={handleScan}
                  disabled={isScanning}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
                  transition={isScanning ? { duration: 1, repeat: Infinity } : {}}
                >
                  {isScanning ? (
                    <motion.div
                      className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-blue-900" />
                  )}
                </motion.button>
              </div>
            </>
          ) : (
            /* Translation Result View */
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-900 to-emerald-700 p-6 overflow-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-white">
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Sparkles className="w-5 h-5 text-emerald-300" />
                  <span className="text-sm text-emerald-200">Translation complete</span>
                </motion.div>

                <motion.div
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm text-white/70 mb-2">Original ({mockTranslation.sourceLanguage})</p>
                  <p className="text-base mb-3">{mockTranslation.originalText}</p>
                  <div className="border-t border-white/20 pt-3">
                    <p className="text-sm text-emerald-200 mb-2">Translation ({mockTranslation.targetLanguage})</p>
                    <p className="text-lg">{mockTranslation.translatedText}</p>
                  </div>
                </motion.div>

                {/* Confidence Score */}
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Zap className="w-4 h-4 text-emerald-300" />
                  <span className="text-sm">Confidence: {(mockTranslation.confidence * 100).toFixed(0)}%</span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results Panel */}
      <AnimatePresence>
        {hasScanned && (
          <motion.div
            className="bg-white rounded-t-3xl p-6 overflow-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            style={{ maxHeight: '40vh' }}
          >
            {/* Allergen Warning */}
            {mockTranslation.allergens.length > 0 && (
              <motion.div
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-red-900 mb-1">Allergen Warning</p>
                    <div className="flex flex-wrap gap-2">
                      {mockTranslation.allergens.map(allergen => (
                        <span
                          key={allergen}
                          className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-xs"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Ingredients */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button
                onClick={() => setShowDetails(prev => ({ ...prev, ingredients: !prev.ingredients }))}
                className="w-full flex items-center justify-between py-3 border-b border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-900" />
                  <span className="text-slate-900">Ingredients</span>
                </div>
                <motion.div
                  animate={{ rotate: showDetails.ingredients ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {showDetails.ingredients && (
                  <motion.div
                    className="pt-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {mockTranslation.ingredients.map(ingredient => (
                        <span
                          key={ingredient}
                          className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Cultural Notes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => setShowDetails(prev => ({ ...prev, cultural: !prev.cultural }))}
                className="w-full flex items-center justify-between py-3 border-b border-slate-200"
              >
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-emerald-600" />
                  <span className="text-slate-900">Cultural Context</span>
                </div>
                <motion.div
                  animate={{ rotate: showDetails.cultural ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {showDetails.cultural && (
                  <motion.div
                    className="pt-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">
                      {mockTranslation.culturalNotes}
                    </p>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-900 mb-1">Historical Note</p>
                      <p className="text-sm text-blue-800">
                        {mockTranslation.history}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Points Earned */}
            <motion.div
              className="mt-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm mb-1">Points Earned</p>
              <p className="text-3xl">+50</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
