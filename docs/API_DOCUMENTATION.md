# SooqPrice API Documentation

## 🗄️ Database Schema

### Users Table
```sql
users (
  id: uuid (primary key)
  email: text (unique)
  username: text (unique)
  full_name: text
  avatar_url: text
  phone: text
  city: text
  badges: jsonb
  reputation_score: integer (default: 0)
  total_submissions: integer (default: 0)
  accurate_submissions: integer (default: 0)
  is_verified: boolean (default: false)
  is_admin: boolean (default: false)
  is_banned: boolean (default: false)
  created_at: timestamp
  updated_at: timestamp
)
```

### Cities Table
```sql
cities (
  id: uuid (primary key)
  name: text (unique)
  name_ar: text
  name_fr: text
  region: text
  coordinates: point
  is_active: boolean (default: true)
  created_at: timestamp
)
```

### Markets Table
```sql
markets (
  id: uuid (primary key)
  city_id: uuid (foreign key)
  name: text
  name_ar: text
  name_fr: text
  address: text
  coordinates: point
  opening_hours: jsonb
  market_type: text (traditional, modern, wholesale)
  is_active: boolean (default: true)
  created_at: timestamp
)
```

### Products Table
```sql
products (
  id: uuid (primary key)
  name: text
  name_ar: text
  name_fr: text
  category: text
  unit: text (kg, piece, bundle)
  image_url: text
  is_seasonal: boolean
  season_start: integer (month)
  season_end: integer (month)
  created_at: timestamp
)
```

### Price Submissions Table
```sql
price_submissions (
  id: uuid (primary key)
  user_id: uuid (foreign key)
  market_id: uuid (foreign key)
  product_id: uuid (foreign key)
  price: decimal
  unit: text
  quality: text (excellent, good, average, poor)
  notes: text
  image_url: text
  verification_status: text (pending, verified, rejected)
  verified_by: uuid (foreign key to users)
  verified_at: timestamp
  submission_date: date
  created_at: timestamp
)
```

### User Badges Table
```sql
user_badges (
  id: uuid (primary key)
  user_id: uuid (foreign key)
  badge_type: text (reliable_reporter, market_expert, price_champion)
  earned_at: timestamp
  expires_at: timestamp
)
```

### Rewards Table
```sql
rewards (
  id: uuid (primary key)
  user_id: uuid (foreign key)
  reward_type: text (points, badge, prize)
  amount: integer
  description: text
  month: integer
  year: integer
  claimed: boolean (default: false)
  created_at: timestamp
)
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/signin` - User login
- `POST /auth/signout` - User logout
- `GET /auth/user` - Get current user

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/leaderboard` - Get monthly leaderboard
- `GET /users/{id}/badges` - Get user badges

### Cities & Markets
- `GET /cities` - List all cities
- `GET /cities/{id}/markets` - Get markets in city
- `GET /markets/{id}` - Get market details
- `GET /markets/{id}/products` - Get products in market

### Products
- `GET /products` - List all products
- `GET /products/search?q={query}` - Search products
- `GET /products/category/{category}` - Get products by category

### Price Submissions
- `POST /submissions` - Submit new price
- `GET /submissions` - Get user's submissions
- `GET /submissions/market/{marketId}` - Get market prices
- `PUT /submissions/{id}` - Update submission
- `DELETE /submissions/{id}` - Delete submission

### Price Data
- `GET /prices/product/{productId}` - Get product prices across markets
- `GET /prices/market/{marketId}` - Get all prices in market
- `GET /prices/compare` - Compare prices across markets
- `GET /prices/trends/{productId}` - Get price trends

### Admin
- `GET /admin/users` - List all users
- `PUT /admin/users/{id}/verify` - Verify user
- `PUT /admin/users/{id}/ban` - Ban/unban user
- `GET /admin/submissions` - Get all submissions
- `PUT /admin/submissions/{id}/verify` - Verify submission
- `POST /admin/rewards` - Create rewards

## 📊 Data Models

### User Model
```typescript
interface User {
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
```

### Market Model
```typescript
interface Market {
  id: string;
  cityId: string;
  name: string;
  nameAr: string;
  nameFr: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [day: string]: {
      open: string;
      close: string;
    };
  };
  marketType: 'traditional' | 'modern' | 'wholesale';
  isActive: boolean;
  createdAt: Date;
}
```

### Product Model
```typescript
interface Product {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  category: string;
  unit: string;
  imageUrl?: string;
  isSeasonal: boolean;
  seasonStart?: number;
  seasonEnd?: number;
  createdAt: Date;
}
```

### Price Submission Model
```typescript
interface PriceSubmission {
  id: string;
  userId: string;
  marketId: string;
  productId: string;
  price: number;
  unit: string;
  quality: 'excellent' | 'good' | 'average' | 'poor';
  notes?: string;
  imageUrl?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedBy?: string;
  verifiedAt?: Date;
  submissionDate: Date;
  createdAt: Date;
  
  // Relations
  user?: User;
  market?: Market;
  product?: Product;
}
```

## 🔒 Security & Validation

### Authentication
- JWT tokens with Supabase Auth
- Row Level Security (RLS) policies
- Rate limiting on submissions

### Data Validation
- Input sanitization
- Price range validation
- Image upload restrictions
- Submission frequency limits

### Anti-fraud Measures
- IP tracking
- Device fingerprinting
- Submission pattern analysis
- User behavior scoring
- Manual review for suspicious activity

## 📈 Real-time Features

### Supabase Realtime
- Live price updates
- New submission notifications
- Leaderboard updates
- Market activity feeds

### WebSocket Events
```typescript
// Subscribe to price updates
supabase
  .channel('price-updates')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'price_submissions'
  }, handleNewPrice)
  .subscribe();
```

## 🔄 Caching Strategy

### Client-side Caching
- React Query for API data
- LocalStorage for user preferences
- IndexedDB for offline data

### Server-side Caching
- Supabase Edge Functions
- CDN for static assets
- Database query optimization

---

## 🚚 **FUTURE PHASE: DELIVERY SERVICE API**

*Planned expansion for Phase 6 - Delivery marketplace integration*

### Additional Database Tables

#### Delivery Partners Table
```sql
delivery_partners (
  id: uuid (primary key)
  user_id: uuid (foreign key to users)
  vehicle_type: text
  license_number: text
  insurance_details: jsonb
  verification_status: text
  active_markets: uuid[] (array of market ids)
  availability_schedule: jsonb
  earnings_total: decimal (default: 0)
  rating_average: decimal (default: 0)
  delivery_count: integer (default: 0)
  is_active: boolean (default: true)
  created_at: timestamp
  updated_at: timestamp
)
```

#### Orders Table
```sql
orders (
  id: uuid (primary key)
  customer_id: uuid (foreign key to users)
  market_id: uuid (foreign key to markets)
  delivery_partner_id: uuid (foreign key to delivery_partners)
  items: jsonb (array of products and quantities)
  total_amount: decimal
  delivery_fee: decimal
  platform_commission: decimal
  status: text (pending, confirmed, picked_up, delivered, cancelled)
  pickup_time: timestamp
  delivery_time: timestamp
  delivery_address: jsonb
  special_instructions: text
  payment_method: text
  payment_status: text
  created_at: timestamp
  updated_at: timestamp
)
```

#### Delivery Zones Table
```sql
delivery_zones (
  id: uuid (primary key)
  market_id: uuid (foreign key to markets)
  zone_name: text
  boundaries: jsonb (geojson polygon)
  delivery_fee: decimal
  estimated_delivery_time: integer (minutes)
  is_active: boolean (default: true)
  created_at: timestamp
)
```

### Delivery API Endpoints

#### Delivery Partner Management
```typescript
// Register as delivery partner
POST /api/delivery/partners/register
{
  vehicle_type: string,
  license_number: string,
  insurance_details: object,
  active_markets: string[],
  availability_schedule: object
}

// Get partner profile
GET /api/delivery/partners/profile

// Update availability
PUT /api/delivery/partners/availability
{
  schedule: object,
  is_active: boolean
}

// Get earnings summary
GET /api/delivery/partners/earnings?period=weekly|monthly
```

#### Order Management
```typescript
// Create order
POST /api/orders
{
  market_id: string,
  items: Array<{product_id: string, quantity: number, price: number}>,
  delivery_address: object,
  special_instructions?: string,
  payment_method: string
}

// Get order details
GET /api/orders/:orderId

// Update order status
PUT /api/orders/:orderId/status
{
  status: 'confirmed' | 'picked_up' | 'delivered' | 'cancelled',
  location?: {lat: number, lng: number},
  notes?: string
}

// Get customer orders
GET /api/orders/customer/:customerId?status=pending|delivered

// Get partner orders
GET /api/orders/partner/:partnerId?status=available|assigned
```

#### Real-time Tracking
```typescript
// Start tracking delivery
POST /api/delivery/tracking/start
{
  order_id: string,
  partner_location: {lat: number, lng: number}
}

// Update partner location
PUT /api/delivery/tracking/location
{
  order_id: string,
  location: {lat: number, lng: number},
  estimated_arrival: timestamp
}

// Get live tracking data
GET /api/delivery/tracking/:orderId
```

#### Commission Management
```typescript
// Calculate commission for order
POST /api/payments/commission/calculate
{
  order_id: string,
  total_amount: number,
  delivery_fee: number
}

// Process commission payment
POST /api/payments/commission/process
{
  order_id: string,
  commission_amount: number
}

// Get commission reports
GET /api/payments/commission/reports?partner_id=string&period=weekly|monthly
```

#### Delivery Zone Management
```typescript
// Get delivery zones for market
GET /api/delivery/zones/market/:marketId

// Create delivery zone
POST /api/delivery/zones
{
  market_id: string,
  zone_name: string,
  boundaries: geojson,
  delivery_fee: number,
  estimated_time: number
}

// Check delivery availability
POST /api/delivery/zones/check
{
  market_id: string,
  delivery_address: {lat: number, lng: number}
}
```

### WebSocket Events for Delivery

```typescript
// Real-time order updates
supabase
  .channel('order-updates')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'orders'
  }, handleOrderUpdate)
  .subscribe();

// Live location tracking
supabase
  .channel('delivery-tracking')
  .on('broadcast', {
    event: 'location-update'
  }, handleLocationUpdate)
  .subscribe();

// Partner availability updates
supabase
  .channel('partner-status')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'delivery_partners'
  }, handlePartnerStatusChange)
  .subscribe();
```

### Business Logic Examples

#### Commission Calculation
```typescript
function calculateCommission(orderTotal: number, deliveryFee: number): number {
  const PLATFORM_COMMISSION_RATE = 0.05; // 5%
  return (orderTotal + deliveryFee) * PLATFORM_COMMISSION_RATE;
}

// Automatic deduction from partner payment
function calculatePartnerPayout(deliveryFee: number, commission: number): number {
  return deliveryFee - commission;
}
```

#### Route Optimization
```typescript
interface DeliveryRoute {
  partner_id: string;
  orders: string[];
  estimated_time: number;
  total_distance: number;
  efficiency_score: number;
}

// AI-powered route optimization
async function optimizeDeliveryRoute(
  partnerId: string, 
  availableOrders: Order[]
): Promise<DeliveryRoute> {
  // Algorithm implementation for route optimization
  // Consider: distance, traffic, order priority, delivery windows
}
```

---

*This delivery API documentation outlines the technical foundation for transforming SooqPrice into a complete marketplace ecosystem with integrated delivery services.*
