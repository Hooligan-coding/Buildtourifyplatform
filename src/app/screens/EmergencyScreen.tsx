import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Shield, Phone, MapPin, Users, AlertTriangle, Volume2, VolumeX, Share2, Navigation, Building2 } from 'lucide-react';
import { emergencyContacts } from '../data/mockData';

interface EmergencyScreenProps {
  onBack: () => void;
}

export function EmergencyScreen({ onBack }: EmergencyScreenProps) {
  const [silentMode, setSilentMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [sosActivated, setSosActivated] = useState(false);

  const handleSOS = () => {
    setSosActivated(true);
    setTimeout(() => setSosActivated(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-red-100 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-slate-900" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-lg text-slate-900">Emergency Assistance</h2>
            <p className="text-sm text-slate-500">We're here to keep you safe</p>
          </div>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="p-6">
        {/* SOS Button */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <Shield className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <h3 className="text-xl text-slate-900 mb-2">Emergency SOS</h3>
              <p className="text-sm text-slate-500">
                Press and hold for 3 seconds to activate emergency services
              </p>
            </div>

            <motion.button
              onMouseDown={handleSOS}
              onTouchStart={handleSOS}
              className={`w-full h-32 rounded-2xl flex items-center justify-center transition-all ${
                sosActivated
                  ? 'bg-red-600 scale-95'
                  : 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center text-white">
                <AlertTriangle className="w-16 h-16 mx-auto mb-2" />
                <p className="text-2xl">SOS</p>
              </div>
            </motion.button>

            {sosActivated && (
              <motion.p
                className="text-center text-red-600 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Emergency services contacted!
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Safety Options */}
        <div className="mb-6">
          <h3 className="text-lg text-slate-900 mb-4">Quick Safety Actions</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <motion.button
              onClick={() => setSilentMode(!silentMode)}
              className={`rounded-2xl p-4 text-left transition-all ${
                silentMode
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white text-slate-900 shadow-sm'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                silentMode ? 'bg-white/20' : 'bg-orange-50'
              }`}>
                {silentMode ? (
                  <VolumeX className={`w-6 h-6 ${silentMode ? 'text-white' : 'text-orange-600'}`} />
                ) : (
                  <Volume2 className="w-6 h-6 text-orange-600" />
                )}
              </div>
              <p className="text-sm mb-1">Silent Alert</p>
              <p className={`text-xs ${silentMode ? 'text-white/80' : 'text-slate-500'}`}>
                {silentMode ? 'Active' : 'Inactive'}
              </p>
            </motion.button>

            <motion.button
              onClick={() => setLocationSharing(!locationSharing)}
              className={`rounded-2xl p-4 text-left transition-all ${
                locationSharing
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-slate-900 shadow-sm'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                locationSharing ? 'bg-white/20' : 'bg-emerald-50'
              }`}>
                <Share2 className={`w-6 h-6 ${locationSharing ? 'text-white' : 'text-emerald-600'}`} />
              </div>
              <p className="text-sm mb-1">Share Location</p>
              <p className={`text-xs ${locationSharing ? 'text-white/80' : 'text-slate-500'}`}>
                {locationSharing ? 'Sharing' : 'Not sharing'}
              </p>
            </motion.button>
          </div>

          {locationSharing && (
            <motion.div
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-emerald-900 mb-1">Location sharing active</p>
                  <p className="text-xs text-emerald-700">Your emergency contacts can track your location</p>
                  <div className="mt-2 bg-white rounded-lg p-2 text-xs text-emerald-600 font-mono">
                    tourify.app/live/abc123xyz
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="mb-6">
          <h3 className="text-lg text-slate-900 mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => {
              const Icon = contact.type === 'police' ? Shield :
                           contact.type === 'ambulance' ? AlertTriangle :
                           contact.type === 'embassy' ? Building2 :
                           Phone;
              
              const bgColor = contact.type === 'police' ? 'bg-blue-50' :
                             contact.type === 'ambulance' ? 'bg-red-50' :
                             contact.type === 'embassy' ? 'bg-purple-50' :
                             'bg-orange-50';
              
              const iconColor = contact.type === 'police' ? 'text-blue-600' :
                               contact.type === 'ambulance' ? 'text-red-600' :
                               contact.type === 'embassy' ? 'text-purple-600' :
                               'text-orange-600';

              return (
                <motion.button
                  key={contact.type}
                  className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${bgColor}`}>
                      <Icon className={`w-7 h-7 ${iconColor}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-slate-900 mb-1">{contact.name}</p>
                      <p className="text-sm text-slate-500">{contact.number}</p>
                    </div>
                    <Phone className="w-5 h-5 text-slate-400" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Trusted Contacts */}
        <div className="mb-6">
          <h3 className="text-lg text-slate-900 mb-4">Trusted Contacts</h3>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-1">Emergency Contacts</p>
                <p className="text-sm text-slate-500">3 contacts added</p>
              </div>
              <button className="text-blue-900 text-sm">Edit</button>
            </div>

            <div className="space-y-3">
              {['Mom', 'John (Brother)', 'Lisa (Friend)'].map((name, index) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                    {name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{name}</p>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg mb-2">Safety Tips</h3>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Always verify driver details before entering vehicle</li>
                <li>• Share your trip details with trusted contacts</li>
                <li>• Trust your instincts - it's okay to cancel</li>
                <li>• Keep your phone charged and accessible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
