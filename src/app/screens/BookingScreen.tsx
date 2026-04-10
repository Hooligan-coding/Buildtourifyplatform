import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Car, Users, MapPin, Clock, Shield, Star, Phone, MessageCircle, Navigation, BadgeCheck, ChevronRight, QrCode } from 'lucide-react';
import { mockDrivers, mockGuides } from '../data/mockData';
import { Driver, Guide } from '../types';
import { useUser } from '../context/UserContext';

interface BookingScreenProps {
  onBack: () => void;
}

export function BookingScreen({ onBack }: BookingScreenProps) {
  const { user } = useUser();
  const [bookingType, setBookingType] = useState<'ride' | 'guide'>('ride');
  const [step, setStep] = useState<'select' | 'confirm' | 'active'>('select');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [tripPin, setTripPin] = useState('');

  const handleBookingConfirm = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setTripPin(pin);
    setStep('confirm');
  };

  const handleStartTrip = () => {
    setStep('active');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center gap-4">
          <motion.button
            onClick={step === 'select' ? onBack : () => setStep('select')}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-slate-900" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-lg text-slate-900">
              {step === 'select' ? 'Book Services' : step === 'confirm' ? 'Confirm Booking' : 'Active Trip'}
            </h2>
            <p className="text-sm text-slate-500">Verified & safe travel</p>
          </div>
          {user.role === 'traveler-premium' && (
            <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" />
              Premium
            </div>
          )}
        </div>

        {step === 'select' && (
          <div className="px-6 pb-4 flex gap-2">
            <motion.button
              onClick={() => setBookingType('ride')}
              className={`flex-1 py-3 rounded-xl text-sm transition-colors ${
                bookingType === 'ride'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <Car className="w-5 h-5 mx-auto mb-1" />
              Rides
            </motion.button>
            <motion.button
              onClick={() => setBookingType('guide')}
              className={`flex-1 py-3 rounded-xl text-sm transition-colors ${
                bookingType === 'guide'
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <Users className="w-5 h-5 mx-auto mb-1" />
              Guides
            </motion.button>
          </div>
        )}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            {/* Pickup/Destination */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-3 h-3 bg-blue-900 rounded-full" />
                <input
                  type="text"
                  placeholder="Current location"
                  defaultValue="Downtown Plaza, 123 Main St"
                  className="flex-1 text-slate-900 bg-transparent outline-none"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 border-2 border-emerald-600 rounded-full" />
                <input
                  type="text"
                  placeholder={bookingType === 'ride' ? 'Where to?' : 'Tour destination'}
                  defaultValue={bookingType === 'ride' ? 'Central Museum' : 'Historic District Tour'}
                  className="flex-1 text-slate-900 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Available Drivers/Guides */}
            <div className="mb-4">
              <h3 className="text-lg text-slate-900 mb-3">
                {bookingType === 'ride' ? 'Available Drivers' : 'Available Guides'}
              </h3>
              
              {bookingType === 'ride' ? (
                <div className="space-y-3">
                  {mockDrivers.map((driver, index) => (
                    <motion.div
                      key={driver.id}
                      className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
                        selectedDriver?.id === driver.id ? 'ring-2 ring-blue-900' : ''
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedDriver(driver)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-slate-900">{driver.name}</h4>
                                {driver.isVerified && (
                                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <p className="text-sm text-slate-500">{driver.vehicleModel}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm text-slate-900">{driver.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{driver.completedTrips} trips</span>
                            <span>•</span>
                            <span>{driver.vehicleType}</span>
                            <span>•</span>
                            <span>ETA: 4 min</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {driver.languages.slice(0, 2).map(lang => (
                              <span
                                key={lang}
                                className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {mockGuides.map((guide, index) => (
                    <motion.div
                      key={guide.id}
                      className={`bg-white rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
                        selectedGuide?.id === guide.id ? 'ring-2 ring-blue-900' : ''
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedGuide(guide)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex gap-4">
                        <img
                          src={guide.photo}
                          alt={guide.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-slate-900">{guide.name}</h4>
                                {guide.isVerified && (
                                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                )}
                              </div>
                              <p className="text-sm text-emerald-600">${guide.hourlyRate}/hour</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                              <span className="text-sm text-slate-900">{guide.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-2">
                            {guide.specialties.slice(0, 2).map(specialty => (
                              <span
                                key={specialty}
                                className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-sm text-slate-500">{guide.completedTours} tours completed</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="p-6"
          >
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white mb-6">
              <div className="text-center mb-6">
                <p className="text-blue-200 text-sm mb-2">Your Trip PIN</p>
                <motion.p
                  className="text-5xl tracking-wider mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {tripPin}
                </motion.p>
                <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
                  <QrCode className="w-4 h-4" />
                  <span>Show this to your driver</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                {bookingType === 'ride' && selectedDriver && (
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDriver.photo}
                      alt={selectedDriver.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="mb-1">{selectedDriver.name}</p>
                      <p className="text-sm text-blue-200">{selectedDriver.vehicleModel}</p>
                      <p className="text-xs text-blue-300">{selectedDriver.licensePlate}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm">{selectedDriver.rating}</span>
                      </div>
                      <p className="text-xs text-blue-200">ETA: 4 min</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <h3 className="text-lg text-slate-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Safety Features Active
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">Live GPS Tracking</p>
                    <p className="text-xs text-slate-500">Real-time location monitoring</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">Route Deviation Alert</p>
                    <p className="text-xs text-slate-500">Automatic notifications enabled</p>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">Masked Communication</p>
                    <p className="text-xs text-slate-500">Privacy protected contact</p>
                  </div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleStartTrip}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Confirm & Start Trip</span>
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {step === 'active' && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            {/* Live Trip Map */}
            <div className="bg-gradient-to-br from-blue-100 to-emerald-100 rounded-2xl h-64 mb-6 relative overflow-hidden flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-blue-900 mx-auto mb-2 animate-pulse" />
                <p className="text-sm text-slate-600">Live Tracking Active</p>
                <p className="text-xs text-slate-500">ETA: 12 minutes</p>
              </div>
              
              {/* Animated route line */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-1 bg-blue-900"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Trip Progress */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-slate-900">Trip in Progress</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-sm text-emerald-600">Active</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xs text-slate-500 mb-1">Pickup</p>
                    <p className="text-sm text-slate-900">Downtown Plaza, 123 Main St</p>
                  </div>
                </div>

                <div className="ml-5 border-l-2 border-dashed border-slate-200 h-8" />

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-xs text-slate-500 mb-1">Destination</p>
                    <p className="text-sm text-slate-900">Central Museum</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">Distance</p>
                  <p className="text-sm text-slate-900">4.2 km</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">Duration</p>
                  <p className="text-sm text-slate-900">12 min</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 mb-1">Fare</p>
                  <p className="text-sm text-slate-900">$18.50</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <motion.button
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="w-6 h-6 text-blue-900 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Call</span>
              </motion.button>
              
              <motion.button
                className="bg-white rounded-xl p-4 text-center shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-6 h-6 text-blue-900 mx-auto mb-2" />
                <span className="text-xs text-slate-600">Message</span>
              </motion.button>
              
              <motion.button
                className="bg-red-50 rounded-xl p-4 text-center shadow-sm"
                whileTap={{ scale: 0.95 }}
              >
                <Shield className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <span className="text-xs text-red-600">SOS</span>
              </motion.button>
            </div>

            {/* Share Trip */}
            <motion.button
              className="w-full bg-slate-100 text-slate-900 py-4 rounded-2xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Navigation className="w-5 h-5" />
              Share Live Location
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Book Button (only on select step) */}
      {step === 'select' && (selectedDriver || selectedGuide) && (
        <motion.div
          className="fixed bottom-6 left-6 right-6 z-30"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
        >
          <motion.button
            onClick={handleBookingConfirm}
            className="w-full bg-blue-900 text-white py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg">
              Book {bookingType === 'ride' ? selectedDriver?.name : selectedGuide?.name}
            </span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
