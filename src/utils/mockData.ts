import { City, Market, Product, User, PriceSubmission, Badge } from '@/types';

// Mock Cities
export const mockCities: City[] = [
  {
    id: '1',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    nameFr: 'Casablanca',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Rabat',
    nameAr: 'الرباط',
    nameFr: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Marrakech',
    nameAr: 'مراكش',
    nameFr: 'Marrakech',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Fez',
    nameAr: 'فاس',
    nameFr: 'Fès',
    region: 'Fès-Meknès',
    coordinates: { lat: 34.0181, lng: -5.0078 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Markets
export const mockMarkets: Market[] = [
  {
    id: '1',
    cityId: '1',
    name: 'Central Market',
    nameAr: 'السوق المركزي',
    nameFr: 'Marché Central',
    address: 'Boulevard Mohammed V, Casablanca',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    openingHours: {
      monday: { open: '06:00', close: '18:00' },
      tuesday: { open: '06:00', close: '18:00' },
      wednesday: { open: '06:00', close: '18:00' },
      thursday: { open: '06:00', close: '18:00' },
      friday: { open: '06:00', close: '18:00' },
      saturday: { open: '06:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    cityId: '1',
    name: 'Derb Ghallef Market',
    nameAr: 'سوق درب غلف',
    nameFr: 'Marché Derb Ghallef',
    address: 'Derb Ghallef, Casablanca',
    coordinates: { lat: 33.5650, lng: -7.6114 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    cityId: '2',
    name: 'Rabat Central Market',
    nameAr: 'السوق المركزي الرباط',
    nameFr: 'Marché Central Rabat',
    address: 'Avenue Mohammed V, Rabat',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    openingHours: {
      monday: { open: '06:30', close: '18:30' },
      tuesday: { open: '06:30', close: '18:30' },
      wednesday: { open: '06:30', close: '18:30' },
      thursday: { open: '06:30', close: '18:30' },
      friday: { open: '06:30', close: '18:30' },
      saturday: { open: '06:30', close: '18:30' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tomatoes',
    nameAr: 'طماطم',
    nameFr: 'Tomates',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/tomatoes.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Potatoes',
    nameAr: 'بطاطس',
    nameFr: 'Pommes de terre',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/potatoes.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Oranges',
    nameAr: 'برتقال',
    nameFr: 'Oranges',
    category: 'fruits',
    unit: 'kg',
    commonUnits: ['kg', 'piece', 'bundle'],
    imageUrl: '/images/products/oranges.jpg',
    isSeasonal: true,
    seasonStart: 11,
    seasonEnd: 4,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Bananas',
    nameAr: 'موز',
    nameFr: 'Bananes',
    category: 'fruits',
    unit: 'kg',
    commonUnits: ['kg', 'bundle'],
    imageUrl: '/images/products/bananas.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Onions',
    nameAr: 'بصل',
    nameFr: 'Oignons',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/onions.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    name: 'Carrots',
    nameAr: 'جزر',
    nameFr: 'Carottes',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'bundle'],
    imageUrl: '/images/products/carrots.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    type: 'reliable_reporter',
    name: 'Reliable Reporter',
    nameAr: 'مراسل موثوق',
    nameFr: 'Rapporteur Fiable',
    description: 'Consistently accurate price submissions',
    icon: '🏆',
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'market_expert',
    name: 'Market Expert',
    nameAr: 'خبير السوق',
    nameFr: 'Expert du Marché',
    description: 'Deep knowledge of market conditions',
    icon: '🎯',
    earnedAt: new Date('2024-02-01'),
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'ahmed4star@gmail.com',
    username: 'ahmed4star',
    fullName: 'Ahmed El Morocci',
    avatarUrl: '/images/avatars/ahmed.jpg',
    phone: '+212612345678',
    city: 'Casablanca',
    badges: [mockBadges[0]],
    reputationScore: 850,
    totalSubmissions: 127,
    accurateSubmissions: 118,
    isVerified: true,
    isAdmin: true, // Made admin
    isBanned: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '2',
    email: 'fatima@example.com',
    username: 'fatima_rbat',
    fullName: 'Fatima Zahra',
    avatarUrl: '/images/avatars/fatima.jpg',
    phone: '+212623456789',
    city: 'Rabat',
    badges: [mockBadges[1]],
    reputationScore: 920,
    totalSubmissions: 89,
    accurateSubmissions: 85,
    isVerified: true,
    isAdmin: false,
    isBanned: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '3',
    email: 'admin@sooqprice.ma',
    username: 'admin',
    fullName: 'SooqPrice Admin',
    avatarUrl: '/images/avatars/admin.jpg',
    city: 'Casablanca',
    badges: [],
    reputationScore: 0,
    totalSubmissions: 0,
    accurateSubmissions: 0,
    isVerified: true,
    isAdmin: true,
    isBanned: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
];

// Mock Price Submissions
export const mockPriceSubmissions: PriceSubmission[] = [
  {
    id: '1',
    userId: '1',
    marketId: '1',
    productId: '1',
    price: 8.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Fresh tomatoes, good quality',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-10'),
    submissionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    user: mockUsers[0],
    market: mockMarkets[0],
    product: mockProducts[0],
  },
  {
    id: '2',
    userId: '2',
    marketId: '2',
    productId: '1',
    price: 9.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Premium quality tomatoes',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-10'),
    submissionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    user: mockUsers[1],
    market: mockMarkets[1],
    product: mockProducts[0],
  },
  {
    id: '3',
    userId: '1',
    marketId: '1',
    productId: '2',
    price: 4.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Regular potatoes',
    verificationStatus: 'pending',
    submissionDate: new Date('2024-06-11'),
    createdAt: new Date('2024-06-11'),
    user: mockUsers[0],
    market: mockMarkets[0],
    product: mockProducts[1],
  },
  {
    id: '4',
    userId: '2',
    marketId: '3',
    productId: '3',
    price: 12.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Sweet oranges, perfect for juice',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-09'),
    submissionDate: new Date('2024-06-09'),
    createdAt: new Date('2024-06-09'),
    user: mockUsers[1],
    market: mockMarkets[2],
    product: mockProducts[2],
  },
  {
    id: '5',
    userId: '1',
    marketId: '2',
    productId: '4',
    price: 15.0,
    unit: 'kg',
    quality: 'good',
    notes: 'Imported bananas',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-08'),
    submissionDate: new Date('2024-06-08'),
    createdAt: new Date('2024-06-08'),
    user: mockUsers[0],
    market: mockMarkets[1],
    product: mockProducts[3],
  },
];

// Helper functions for mock data
export const getMockCityById = (id: string): City | undefined => 
  mockCities.find(city => city.id === id);

export const getMockMarketById = (id: string): Market | undefined => 
  mockMarkets.find(market => market.id === id);

// Get product by id
export const getMockProductById = (productId: string): Product | undefined => {
  return mockProducts.find(product => product.id === productId);
};

export const getMockUserById = (id: string): User | undefined => 
  mockUsers.find(user => user.id === id);

export const getMockMarketsByCity = (cityId: string): Market[] => 
  mockMarkets.filter(market => market.cityId === cityId);

export const getMockSubmissionsByMarket = (marketId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.marketId === marketId);

export const getMockSubmissionsByProduct = (productId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.productId === productId);

export const getMockSubmissionsByUser = (userId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.userId === userId);

// Get submissions by city
export const getMockSubmissionsByCity = (cityId: string): PriceSubmission[] => {
  const cityMarkets = getMockMarketsByCity(cityId);
  const marketIds = cityMarkets.map(m => m.id);
  return mockPriceSubmissions.filter(submission => 
    marketIds.includes(submission.marketId)
  );
};

// Search function for products
export const searchMockProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.nameAr.includes(query) ||
    product.nameFr.toLowerCase().includes(lowerQuery)
  );
};

// Get latest prices for a product across markets
export const getMockLatestPrices = (productId: string): PriceSubmission[] => {
  const submissions = getMockSubmissionsByProduct(productId);
  const latestByMarket = new Map<string, PriceSubmission>();
  
  submissions.forEach(submission => {
    const existing = latestByMarket.get(submission.marketId);
    if (!existing || submission.submissionDate > existing.submissionDate) {
      latestByMarket.set(submission.marketId, submission);
    }
  });
  
  return Array.from(latestByMarket.values());
};
