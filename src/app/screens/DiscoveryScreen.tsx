import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Heart, Star, Phone, Navigation, Building2, Shield, Utensils, Map as MapIcon, BadgeCheck, Filter } from 'lucide-react';
import { mockNearbyPlaces } from '../data/mockData';
import { NearbyPlace } from '../types';

interface DiscoveryScreenProps {
  onBack: () => void;
}

const categoryIcons = {
  hospital: Building2,
  police: Shield,
  embassy: Building2,
  restaurant: Utensils,
  attraction: MapIcon,
};

const categoryColors = {
  hospital: 'text-red-600 bg-red-50',
  police: 'text-blue-600 bg-blue-50',
  embassy: 'text-purple-600 bg-purple-50',
  restaurant: 'text-orange-600 bg-orange-50',
  attraction: 'text-emerald-600 bg-emerald-50',
};

export function DiscoveryScreen({ onBack }: DiscoveryScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<NearbyPlace | null>(null);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'hospital', label: 'Hospitals' },
    { id: 'police', label: 'Police' },
    { id: 'embassy', label: 'Embassy' },
    { id: 'restaurant', label: 'Food' },
    { id: 'attraction', label: 'Attractions' },
  ];

  const filteredPlaces = selectedCategory === 'all' 
    ? mockNearbyPlaces 
    : mockNearbyPlaces.filter(p => p.type === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="px-6 py-4 flex items-center gap-4">
          <motion.button
            onClick={onBack}
            className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 text-slate-900" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-lg text-slate-900">Discover Nearby</h2>
            <p className="text-sm text-slate-500">Verified & trusted locations</p>
          </div>
          <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
            <Filter className="w-5 h-5 text-slate-900" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-6 pb-4 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 to-emerald-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-blue-900 mx-auto mb-2" />
            <p className="text-sm text-slate-600">Interactive Map View</p>
            <p className="text-xs text-slate-500">Showing {filteredPlaces.length} locations</p>
          </div>
        </div>
        
        {/* Map Pins Simulation */}
        {filteredPlaces.slice(0, 5).map((place, index) => {
          const Icon = categoryIcons[place.type];
          return (
            <motion.div
              key={place.id}
              className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + (index % 2) * 20}%`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPlace(place)}
            >
              <Icon className={`w-5 h-5 ${categoryColors[place.type].split(' ')[0]}`} />
              {place.isTrustedZone && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* User Location */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Places List */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-slate-900">
            {selectedCategory === 'all' ? 'All Locations' : categories.find(c => c.id === selectedCategory)?.label}
          </h3>
          <span className="text-sm text-slate-500">{filteredPlaces.length} found</span>
        </div>

        <div className="space-y-3">
          {filteredPlaces.map((place, index) => {
            const Icon = categoryIcons[place.type];
            return (
              <motion.div
                key={place.id}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPlace(place)}
              >
                <div className="flex gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${categoryColors[place.type]}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-slate-900 truncate">{place.name}</h4>
                      {place.isVerified && (
                        <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm text-slate-900">{place.rating}</span>
                        <span className="text-xs text-slate-400">({place.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Navigation className="w-4 h-4" />
                        <span className="text-sm">{place.distance} km</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-500 truncate">{place.address}</p>
                    
                    {place.isTrustedZone && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-xs">
                        <Shield className="w-3 h-3" />
                        Trusted Zone
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Place Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlace(null)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-40 max-h-[70vh] overflow-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <div className="p-6">
                <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-6" />
                
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${categoryColors[selectedPlace.type]}`}>
                    {React.createElement(categoryIcons[selectedPlace.type], { className: 'w-8 h-8' })}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-xl text-slate-900">{selectedPlace.name}</h2>
                      {selectedPlace.isVerified && (
                        <BadgeCheck className="w-6 h-6 text-emerald-600" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="text-slate-900">{selectedPlace.rating}</span>
                      <span className="text-slate-400">({selectedPlace.reviewCount} reviews)</span>
                    </div>
                    
                    {selectedPlace.isTrustedZone && (
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm">
                        <Shield className="w-4 h-4" />
                        Trusted Zone
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-600">{selectedPlace.address}</p>
                      <p className="text-sm text-emerald-600">{selectedPlace.distance} km away</p>
                    </div>
                  </div>

                  {selectedPlace.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <p className="text-sm text-slate-600">{selectedPlace.phoneNumber}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    className="bg-blue-900 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Navigation className="w-5 h-5" />
                    Directions
                  </motion.button>
                  <motion.button
                    className="bg-slate-100 text-slate-900 py-3 rounded-xl flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-5 h-5" />
                    Save
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
