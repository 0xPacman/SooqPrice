import React from 'react';
import ComingSoonPage from '../../components/common/ComingSoonPage';

const RewardsPage: React.FC = () => {
  return (
    <ComingSoonPage
      title="Rewards & Leaderboard"
      description="Earn points, climb the leaderboard, and get rewarded for helping the community with accurate price submissions."
      icon="🏆"
      features={[
        "Monthly leaderboard competitions",
        "Reputation points system",
        "Achievement badges and trophies",
        "Cash rewards for top contributors",
        "Exclusive market access privileges",
        "Early feature access benefits",
        "Community recognition system",
        "Referral bonus programs"
      ]}
      expectedRelease="Phase 3"
      backPath="/profile"
      bgGradient="linear(to-br, yellow.400, orange.500)"
    />
  );
};

export default RewardsPage;
