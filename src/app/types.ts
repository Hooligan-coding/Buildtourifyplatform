export type UserRole = 'traveler-free' | 'traveler-premium' | 'driver' | 'guide' | 'partner' | 'admin';

export type TierLevel = 'Explorer' | 'Navigator' | 'Elite Traveler';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tier: TierLevel;
  points: number;
  profileImage?: string;
  isVerified?: boolean;
  joinedDate: string;
  phoneNumber?: string;
}

export interface Translation {
  id: string;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence: number;
  allergens?: string[];
  ingredients?: string[];
  culturalNotes?: string;
  timestamp: Date;
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: 'hospital' | 'police' | 'embassy' | 'restaurant' | 'attraction';
  distance: number;
  rating: number;
  isVerified: boolean;
  isTrustedZone: boolean;
  address: string;
  coordinates: { lat: number; lng: number };
  phoneNumber?: string;
  reviewCount: number;
}

export interface Driver {
  id: string;
  name: string;
  photo: string;
  rating: number;
  completedTrips: number;
  vehicleType: string;
  vehicleModel: string;
  licensePlate: string;
  isVerified: boolean;
  phoneNumber: string;
  languages: string[];
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  rating: number;
  completedTours: number;
  specialties: string[];
  isVerified: boolean;
  phoneNumber: string;
  languages: string[];
  hourlyRate: number;
}

export interface Booking {
  id: string;
  type: 'ride' | 'guide';
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  driver?: Driver;
  guide?: Guide;
  pickupLocation: string;
  dropoffLocation?: string;
  scheduledTime: Date;
  estimatedDuration: number;
  price: number;
  pin?: string;
  qrCode?: string;
  route?: { lat: number; lng: number }[];
}

export interface Reward {
  id: string;
  type: 'ride-discount' | 'meal-voucher' | 'attraction-discount' | 'premium-upgrade';
  title: string;
  description: string;
  pointsCost: number;
  value: number;
  expiryDate?: Date;
  image?: string;
}

export interface Transaction {
  id: string;
  type: 'earn' | 'redeem';
  points: number;
  description: string;
  date: Date;
  category: 'translation' | 'booking' | 'review' | 'referral' | 'reward';
}

export interface EmergencyContact {
  type: 'police' | 'ambulance' | 'embassy' | 'fire';
  number: string;
  name: string;
}

export interface AdminStats {
  totalUsers: number;
  activeDrivers: number;
  pendingVerifications: number;
  todayRevenue: number;
  monthlyRevenue: number;
  totalBookings: number;
  flaggedUsers: number;
  rewardIssuance: number;
}
