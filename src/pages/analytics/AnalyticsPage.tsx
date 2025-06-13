import React from 'react';
import ComingSoonPage from '../../components/common/ComingSoonPage';

const AnalyticsPage: React.FC = () => {
  return (
    <ComingSoonPage
      title="Price Analytics & Charts"
      description="Visualize price trends, compare market data, and get insights with interactive charts and analytics tools."
      icon="📈"
      features={[
        "Interactive price trend charts",
        "Market comparison analytics",
        "Seasonal price pattern analysis",
        "Product demand forecasting",
        "City-wise price comparison graphs",
        "Historical price data visualization",
        "Export data and reports",
        "Advanced filtering and sorting"
      ]}
      expectedRelease="Phase 3"
      backPath="/markets"
      bgGradient="linear(to-br, teal.400, cyan.600)"
    />
  );
};

export default AnalyticsPage;
