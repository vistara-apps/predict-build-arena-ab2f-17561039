
export interface User {
  userId: string;
  walletAddress: string;
  profileHash?: string;
  username?: string;
  avatar?: string;
}

export interface Prediction {
  predictionId: string;
  userId: string;
  featureDescription: string;
  predictionQuery: string;
  outcomeThreshold: number;
  stakedAmount: number;
  status: "active" | "resolved" | "failed";
  createdAt: Date;
  resolvedAt?: Date;
  successRate?: number;
  totalStakers?: number;
  user?: User;
}

export interface MVPBuild {
  buildId: string;
  predictionId: string;
  status: "pending" | "building" | "deployed";
  codeRepositoryUrl?: string;
  deployedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Badge {
  badgeId: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface LeaderboardEntry {
  user: User;
  score: number;
  rank: number;
  successfulPredictions: number;
  totalStaked: number;
  badges: Badge[];
}
