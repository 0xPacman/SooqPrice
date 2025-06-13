import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Layout from './components/layout/Layout';
import HomePage from './pages/home/HomePage';
import MarketsPage from './pages/markets/MarketsPage';
import MarketDetailPage from './pages/markets/MarketDetailPage';
import CityDetailPage from './pages/cities/CityDetailPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import PriceSubmissionPage from './pages/submit/PriceSubmissionPage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
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
            <Route path="products/:productId" element={<ProductDetailPage />} />
            <Route path="markets" element={<MarketsPage />} />
            <Route path="markets/:marketId" element={<MarketDetailPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="admin/*" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Box>
    </AuthProvider>
  );
}

export default App;
