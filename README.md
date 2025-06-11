# SooqPrice 🛒🇲🇦

*Monitoring and comparing fresh-produce prices across Moroccan souks*

## Overview

SooqPrice is a mobile-friendly web application that enables users to monitor and compare fresh produce prices across different souks (markets) in Morocco. The platform leverages community-driven price submissions to provide real-time market insights.

## 🌟 Features

### User Features
- **Browse Souks by City**: Explore markets organized by Moroccan cities
- **Real-time Price Updates**: View community-submitted price information
- **Price Submission**: Submit price data for products you see in markets
- **Price Comparison**: Compare prices across different markets
- **Product & Location Search**: Find specific products and locations
- **User Profiles**: Badge and tagging system for trusted contributors

### Gamification & Rewards
- **Reward System**: Incentives for accurate price submissions
- **Monthly Leaderboards**: Competition among top contributors
- **User Badges**: Recognition system for reliable users
- **Anti-fraud Detection**: System to detect fake accounts and submissions

### Admin Dashboard
- **User Management**: Monitor and manage user accounts
- **Submission Oversight**: Review and validate price submissions
- **Reward Distribution**: Manage monthly rewards and leaderboards
- **Market Management**: Add/edit cities and markets
- **Analytics**: Track platform usage and trends

## 🛠️ Technology Stack

- **Frontend**: React with Vite
- **UI Framework**: Chakra UI
- **Database**: Supabase
- **State Management**: React Context/Zustand
- **Authentication**: Supabase Auth
- **Mobile**: Future phase with CapacitorJS
- **Development**: LocalStorage for testing phase

## 🎨 Design System

- **Primary Colors**: White, Light Yellow, Green
- **Modern UI**: Clean, mobile-first design
- **Responsive**: Optimized for mobile devices
- **Accessibility**: WCAG 2.1 compliant

## 📁 Project Structure

```
SooqPrice/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── services/           # API services
│   ├── stores/             # State management
│   ├── types/              # TypeScript definitions
│   └── assets/             # Images, icons, etc.
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Git

### Installation
```bash
git clone <repository-url>
cd SooqPrice
npm install
npm run dev
```

### Environment Setup
Create a `.env.local` file:
```env
VITE_SUPABASE_URL=https://jsqkmwjoijfqzaggjsfl.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzcWttd2pvaWpmcXphZ2dqc2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTAwMjIsImV4cCI6MjA2NTIyNjAyMn0.xJtrIdqujfXB1LPl8N6wdUvLBjrWjmxlwVo4eBi0TjA
```

## 📋 Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [x] Project setup and structure
- [ ] Basic UI components with Chakra UI
- [ ] LocalStorage mock data implementation
- [ ] Basic routing setup
- [ ] Responsive design implementation

### Phase 2: Core Features (Weeks 3-4)
- [ ] User authentication system
- [ ] Price submission functionality
- [ ] Market browsing by city
- [ ] Basic search functionality
- [ ] Price comparison views

### Phase 3: Enhanced Features (Weeks 5-6)
- [ ] User profiles and badges
- [ ] Leaderboard system
- [ ] Reward mechanism
- [ ] Advanced search and filters
- [ ] Data validation

### Phase 4: Admin & Anti-fraud (Weeks 7-8)
- [ ] Admin dashboard
- [ ] User management
- [ ] Submission moderation
- [ ] Anti-fraud detection
- [ ] Analytics implementation

### Phase 5: Production & Mobile (Weeks 9-10)
- [ ] Supabase integration
- [ ] Performance optimization
- [ ] CapacitorJS mobile app
- [ ] Production deployment
- [ ] Testing and QA

## 🎯 Current Sprint Tasks

### Week 1 Goals
- [ ] Set up React + Vite + Chakra UI
- [ ] Create basic component library
- [ ] Implement routing structure
- [ ] Design mobile-first layouts
- [ ] Create mock data for testing

### Week 2 Goals
- [ ] Build main navigation
- [ ] Implement market browsing
- [ ] Create price submission form
- [ ] Add search functionality
- [ ] Responsive design testing

## 🏗️ Architecture Decisions

### State Management
- **Local State**: React useState/useReducer for component state
- **Global State**: Context API for user auth, Zustand for complex state
- **Server State**: React Query for API data management

### Data Flow
- **Testing Phase**: LocalStorage with mock data
- **Production**: Supabase for real-time data
- **Caching**: Implement smart caching for better performance

### Component Strategy
- **Atomic Design**: Atoms, molecules, organisms pattern
- **Reusability**: Shared components in `/components`
- **Page Components**: Feature-specific components in `/pages`

## 🔐 Security Considerations

- **Input Validation**: All user inputs validated client and server-side
- **Authentication**: Secure auth flow with Supabase
- **Anti-fraud**: IP tracking, submission patterns, user behavior analysis
- **Data Privacy**: GDPR-compliant data handling

## 🌍 Localization

- **Languages**: Arabic, French, English
- **RTL Support**: Right-to-left language support
- **Cultural Context**: Moroccan market terminology and customs

## 📊 Analytics & Monitoring

- **User Behavior**: Track user interactions and patterns
- **Performance**: Monitor app performance and load times
- **Business Metrics**: Track submissions, user growth, market coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Made with ❤️ for the Moroccan community*