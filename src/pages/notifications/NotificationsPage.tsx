import React from 'react';
import ComingSoonPage from '../../components/common/ComingSoonPage';

const NotificationsPage: React.FC = () => {
  return (
    <ComingSoonPage
      title="Notifications & Alerts"
      description="Get instant notifications about price changes, market updates, and community activities that matter to you."
      icon="🔔"
      features={[
        "Price drop alerts for your favorite products",
        "New market opening notifications",
        "Weekly price comparison reports",
        "Reward and badge achievement alerts",
        "Custom price threshold notifications",
        "Market-specific update alerts",
        "Push notifications for mobile app",
        "Email digest options"
      ]}
      expectedRelease="Phase 2"
      backPath="/profile"
      bgGradient="linear(to-br, orange.400, red.500)"
    />
  );
};

export default NotificationsPage;
