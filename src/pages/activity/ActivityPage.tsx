import React from 'react';
import ComingSoonPage from '../../components/common/ComingSoonPage';

const ActivityPage: React.FC = () => {
  return (
    <ComingSoonPage
      title="Activity Feed"
      description="Stay updated with real-time price submissions, market trends, and community activity across all Moroccan souks."
      icon="📊"
      features={[
        "Real-time price update notifications",
        "Community activity timeline",
        "Personalized market alerts",
        "Weekly price trend summaries",
        "Following your favorite markets",
        "Price change notifications",
        "Community achievement updates",
        "Market opening/closing alerts"
      ]}
      expectedRelease="Phase 2"
      backPath="/"
      bgGradient="linear(to-br, blue.400, purple.600)"
    />
  );
};

export default ActivityPage;
