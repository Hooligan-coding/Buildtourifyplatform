import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';
import { UserProvider, useUser } from './context/UserContext';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';
import { ScanScreen } from './screens/ScanScreen';
import { DiscoveryScreen } from './screens/DiscoveryScreen';
import { BookingScreen } from './screens/BookingScreen';
import { EmergencyScreen } from './screens/EmergencyScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { PremiumScreen } from './screens/PremiumScreen';
import { AdminScreen } from './screens/AdminScreen';
import { BottomNav } from './components/BottomNav';
import { RoleSelector } from './components/RoleSelector';
import { FloatingMenu } from './components/FloatingMenu';
import { SplashScreen } from './components/SplashScreen';
import { FeatureTour } from './components/FeatureTour';

function AppContent() {
  const { user } = useUser();
  const [showSplash, setShowSplash] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showFeatureTour, setShowFeatureTour] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setShowFeatureTour(true);
  };

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Admin role gets direct access to admin dashboard
  if (hasCompletedOnboarding && user.role === 'admin') {
    return <AdminScreen onBack={() => setCurrentScreen('home')} />;
  }

  // Show onboarding first
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Main app screens
  const showBottomNav = !['scan', 'emergency', 'premium', 'admin'].includes(currentScreen);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Settings/Role Switcher Button */}
      {currentScreen === 'home' && (
        <motion.button
          onClick={() => setShowRoleSelector(true)}
          className="fixed top-6 right-6 z-40 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings className="w-5 h-5 text-slate-900" />
        </motion.button>
      )}

      {/* Screen Router */}
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HomeScreen onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentScreen === 'scan' && (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScanScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'discover' && (
          <motion.div
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DiscoveryScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'booking' && (
          <motion.div
            key="booking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BookingScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'emergency' && (
          <motion.div
            key="emergency"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmergencyScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RewardsScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'premium' && (
          <motion.div
            key="premium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PremiumScreen onBack={() => handleNavigate('home')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} />
      )}

      {/* Floating Quick Menu */}
      {showBottomNav && (
        <FloatingMenu
          onEmergency={() => handleNavigate('emergency')}
          onSettings={() => setShowRoleSelector(true)}
        />
      )}

      {/* Role Selector Modal */}
      <RoleSelector
        isOpen={showRoleSelector}
        onClose={() => setShowRoleSelector(false)}
      />

      {/* Feature Tour */}
      <FeatureTour
        isOpen={showFeatureTour}
        onClose={() => setShowFeatureTour(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
