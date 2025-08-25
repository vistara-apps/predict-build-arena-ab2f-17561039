
import type { Prediction, User, LeaderboardEntry, Badge, MVPBuild } from "./types";

export const mockUsers: User[] = [
  {
    userId: "1",
    walletAddress: "0x1234567890123456789012345678901234567890",
    username: "builderguru",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=builderguru",
  },
  {
    userId: "2", 
    walletAddress: "0x2345678901234567890123456789012345678901",
    username: "predictmaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=predictmaster",
  },
  {
    userId: "3",
    walletAddress: "0x3456789012345678901234567890123456789012", 
    username: "mvpwizard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mvpwizard",
  },
];

export const mockPredictions: Prediction[] = [
  {
    predictionId: "1",
    userId: "1",
    featureDescription: "Dark mode toggle will increase user retention by 15%",
    predictionQuery: "Will dark mode feature increase 7-day retention rate from 45% to 60%?",
    outcomeThreshold: 60,
    stakedAmount: 25.50,
    status: "active",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    totalStakers: 12,
    user: mockUsers[0],
  },
  {
    predictionId: "2",
    userId: "2",
    featureDescription: "Social sharing buttons will boost viral coefficient by 2x",
    predictionQuery: "Will social sharing increase k-factor from 0.3 to 0.6?",
    outcomeThreshold: 0.6,
    stakedAmount: 42.00,
    status: "active",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    totalStakers: 8,
    user: mockUsers[1],
  },
  {
    predictionId: "3",
    userId: "3",
    featureDescription: "Push notifications will improve DAU by 25%",
    predictionQuery: "Will push notifications increase daily active users by 25%?",
    outcomeThreshold: 125,
    stakedAmount: 15.75,
    status: "resolved",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    successRate: 85,
    totalStakers: 6,
    user: mockUsers[2],
  },
];

export const mockBadges: Badge[] = [
  {
    badgeId: "1",
    name: "Insightful Predictor",
    description: "Made 5 successful predictions",
    imageUrl: "🎯",
    rarity: "common",
  },
  {
    badgeId: "2", 
    name: "MVP Catalyst",
    description: "Triggered 3 MVP builds",
    imageUrl: "🚀",
    rarity: "rare",
  },
  {
    badgeId: "3",
    name: "Community Builder",
    description: "Helped build 10 features",
    imageUrl: "🏗️",
    rarity: "epic",
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    user: mockUsers[0],
    score: 1250,
    rank: 1,
    successfulPredictions: 12,
    totalStaked: 156.75,
    badges: [mockBadges[0], mockBadges[1]],
  },
  {
    user: mockUsers[1],
    score: 980,
    rank: 2,
    successfulPredictions: 8,
    totalStaked: 120.50,
    badges: [mockBadges[0]],
  },
  {
    user: mockUsers[2],
    score: 750,
    rank: 3,
    successfulPredictions: 6,
    totalStaked: 89.25,
    badges: [mockBadges[2]],
  },
];

export const mockBuilds: MVPBuild[] = [
  {
    buildId: "1",
    predictionId: "3",
    status: "deployed",
    codeRepositoryUrl: "https://github.com/predict-arena/dark-mode-mvp",
    deployedUrl: "https://dark-mode-demo.vercel.app",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    buildId: "2", 
    predictionId: "1",
    status: "building",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
];
