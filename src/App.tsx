import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import MarketsPage from './pages/markets/MarketsPage';
import MarketDetailPage from './pages/markets/MarketDetailPage';
import CityDetailPage from './pages/cities/CityDetailPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import ProductsPage from './pages/products/ProductsPage';
import PriceSubmissionPage from './pages/submit/PriceSubmissionPage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ActivityPage from './pages/activity/ActivityPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import RewardsPage from './pages/rewards/RewardsPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import SettingsPage from './pages/settings/SettingsPage';
import AccountSettingsPage from './pages/settings/AccountSettingsPage';
import { AuthProvider } from './hooks/useAuth';
import { LanguageProvider } from './hooks/useLanguage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Box minH="100vh" bg="gray.50">
          <Routes>
            {/* Auth routes without layout */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Main app routes with layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="submit" element={<PriceSubmissionPage />} />
              <Route path="cities/:cityId" element={<CityDetailPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:productId" element={<ProductDetailPage />} />
              <Route path="markets" element={<MarketsPage />} />
              <Route path="markets/:marketId" element={<MarketDetailPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="admin/*" element={<AdminDashboard />} />
              
              {/* Coming Soon Pages */}
              <Route path="activity" element={<ActivityPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="rewards" element={<RewardsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="settings/account" element={<AccountSettingsPage />} />
            </Route>
          </Routes>
        </Box>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
