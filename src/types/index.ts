// User related types
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  city?: string;
  badges: Badge[];
  reputationScore: number;
  totalSubmissions: number;
  accurateSubmissions: number;
  isVerified: boolean;
  isAdmin: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  nameAr: string;
  nameFr: string;
  description: string;
  icon: string;
  earnedAt: Date;
  expiresAt?: Date;
}

export type BadgeType = 
  | 'reliable_reporter'
  | 'market_expert'
  | 'price_champion'
  | 'community_leader'
  | 'early_adopter'
  | 'frequent_contributor';

// Location related types
export interface City {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  region: string;
  coordinates: Coordinates;
  isActive: boolean;
  createdAt: Date;
}

export interface Market {
  id: string;
  cityId: string;
  name: string;
  nameAr: string;
  nameFr: string;
  address: string;
  coordinates: Coordinates;
  openingHours: OpeningHours;
  marketType: MarketType;
  isActive: boolean;
  createdAt: Date;
  city?: City;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    isClosed?: boolean;
  };
}

export type MarketType = 'traditional' | 'modern' | 'wholesale';

// Product related types
export interface Product {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  category: ProductCategory;
  unit: ProductUnit;
  imageUrl?: string;
  isSeasonal: boolean;
  seasonStart?: number;
  seasonEnd?: number;
  createdAt: Date;
}

export type ProductCategory = 
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'dairy'
  | 'meat'
  | 'seafood'
  | 'spices'
  | 'herbs';

export type ProductUnit = 'kg' | 'piece' | 'bundle' | 'liter' | 'gram';

// Price submission related types
export interface PriceSubmission {
  id: string;
  userId: string;
  marketId: string;
  productId: string;
  price: number;
  unit: ProductUnit;
  quality: ProductQuality;
  notes?: string;
  imageUrl?: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: Date;
  submissionDate: Date;
  createdAt: Date;
  
  // Relations
  user?: User;
  market?: Market;
  product?: Product;
}

export type ProductQuality = 'excellent' | 'good' | 'average' | 'poor';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

// Reward related types
export interface Reward {
  id: string;
  userId: string;
  rewardType: RewardType;
  amount: number;
  description: string;
  month: number;
  year: number;
  claimed: boolean;
  createdAt: Date;
}

export type RewardType = 'points' | 'badge' | 'prize' | 'cash';

// Search and filter types
export interface SearchFilters {
  query?: string;
  cityId?: string;
  marketId?: string;
  category?: ProductCategory;
  priceRange?: {
    min: number;
    max: number;
  };
  quality?: ProductQuality;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Auth types
export interface AuthUser {
  id: string;
  email: string;
  isAuthenticated: boolean;
  profile?: User;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  phone?: string;
  city?: string;
}

export interface PriceSubmissionForm {
  marketId: string;
  productId: string;
  price: number;
  unit: ProductUnit;
  quality: ProductQuality;
  notes?: string;
  image?: File;
}

// Navigation types
export interface NavItem {
  label: string;
  labelAr: string;
  labelFr: string;
  href: string;
  icon: string;
  isProtected?: boolean;
  isAdminOnly?: boolean;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}

// Utility types
export type Language = 'ar' | 'fr' | 'en';
export type Direction = 'ltr' | 'rtl';

export interface LocalizedString {
  ar: string;
  fr: string;
  en: string;
}
