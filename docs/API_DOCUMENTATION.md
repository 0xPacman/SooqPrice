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
