
"use client";

import { useState, useEffect } from "react";
import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { TrendingUp, Trophy, Zap, Plus, Target } from "lucide-react";

import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { PredictionCard } from "./components/PredictionCard";
import { LeaderboardEntry as LeaderboardEntryComponent } from "./components/LeaderboardEntry";
import { BadgeDisplay } from "./components/BadgeDisplay";
import { CreatePrediction } from "./components/CreatePrediction";
import { BuildProgress } from "./components/BuildProgress";

import { mockPredictions, mockLeaderboard, mockBadges, mockBuilds } from "./lib/mock-data";
import type { Prediction } from "./lib/types";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [activeTab, setActiveTab] = useState("predictions");
  const [predictions, setPredictions] = useState(mockPredictions);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleStake = (predictionId: string) => {
    // Simulate staking by adding to staked amount
    setPredictions(prev => 
      prev.map(p => 
        p.predictionId === predictionId 
          ? { ...p, stakedAmount: p.stakedAmount + 10, totalStakers: (p.totalStakers || 0) + 1 }
          : p
      )
    );
  };

  const handleCreatePrediction = (data: {
    featureDescription: string;
    predictionQuery: string;
    outcomeThreshold: number;
    stakedAmount: number;
  }) => {
    const newPrediction: Prediction = {
      predictionId: Date.now().toString(),
      userId: "current-user",
      ...data,
      status: "active",
      createdAt: new Date(),
      totalStakers: 1,
      user: {
        userId: "current-user",
        walletAddress: "0x...",
        username: "you",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
      },
    };
    
    setPredictions(prev => [newPrediction, ...prev]);
  };

  const activePredictions = predictions.filter(p => p.status === "active");
  const resolvedPredictions = predictions.filter(p => p.status === "resolved");

  return (
    <div className="w-full max-w-[600px] mx-auto px-4 min-h-screen bg-bg">
      {/* Header */}
      <header className="sticky top-0 bg-bg/80 backdrop-blur-sm border-b border-border py-lg mb-lg z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-display">Predict & Build</h1>
              <p className="text-caption">Where predictions forge products</p>
            </div>
          </div>

          <Wallet className="z-10">
            <ConnectWallet>
              <Avatar className="w-8 h-8" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-md mb-xl">
        <Card>
          <div className="text-center space-y-sm">
            <TrendingUp className="w-6 h-6 text-accent mx-auto" />
            <div className="text-display">{activePredictions.length}</div>
            <div className="text-caption">Active</div>
          </div>
        </Card>
        <Card>
          <div className="text-center space-y-sm">
            <Zap className="w-6 h-6 text-primary mx-auto" />
            <div className="text-display">{mockBuilds.length}</div>
            <div className="text-caption">Building</div>
          </div>
        </Card>
        <Card>
          <div className="text-center space-y-sm">
            <Trophy className="w-6 h-6 text-warning mx-auto" />
            <div className="text-display">{resolvedPredictions.length}</div>
            <div className="text-caption">Resolved</div>
          </div>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-sm mb-xl overflow-x-auto">
        {[
          { id: "predictions", label: "Predictions", icon: TrendingUp },
          { id: "leaderboard", label: "Leaderboard", icon: Trophy },
          { id: "badges", label: "Badges", icon: Zap },
          { id: "builds", label: "Builds", icon: Target },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "primary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(id)}
            icon={<Icon className="w-4 h-4" />}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Content */}
      <main className="space-y-lg pb-xl">
        {activeTab === "predictions" && (
          <div className="space-y-lg">
            <CreatePrediction onCreatePrediction={handleCreatePrediction} />
            
            <div className="space-y-md">
              <h2 className="text-display">Active Predictions</h2>
              {activePredictions.map((prediction) => (
                <PredictionCard
                  key={prediction.predictionId}
                  prediction={prediction}
                  variant="active"
                  onStake={handleStake}
                />
              ))}
            </div>

            {resolvedPredictions.length > 0 && (
              <div className="space-y-md">
                <h2 className="text-display">Recent Results</h2>
                {resolvedPredictions.slice(0, 3).map((prediction) => (
                  <PredictionCard
                    key={prediction.predictionId}
                    prediction={prediction}
                    variant="resolved"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-lg">
            <div className="text-center space-y-md">
              <h2 className="text-display">Top Predictors</h2>
              <p className="text-caption">Ranked by accuracy and impact</p>
            </div>
            
            <div className="space-y-md">
              {mockLeaderboard.map((entry, index) => (
                <LeaderboardEntryComponent
                  key={entry.user.userId}
                  entry={entry}
                  highlighted={index === 0}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="space-y-lg">
            <div className="text-center space-y-md">
              <h2 className="text-display">Achievement Badges</h2>
              <p className="text-caption">Collect badges by making accurate predictions</p>
            </div>
            
            <div className="grid grid-cols-2 gap-md">
              {mockBadges.map((badge) => (
                <BadgeDisplay
                  key={badge.badgeId}
                  badge={badge}
                  size="large"
                  owned={Math.random() > 0.3}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "builds" && (
          <div className="space-y-lg">
            <div className="text-center space-y-md">
              <h2 className="text-display">MVP Builds</h2>
              <p className="text-caption">Automated builds triggered by successful predictions</p>
            </div>
            
            <div className="space-y-md">
              {mockBuilds.map((build) => (
                <BuildProgress
                  key={build.buildId}
                  build={build}
                  onViewCode={(url) => openUrl(url)}
                  onViewDemo={(url) => openUrl(url)}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-lg border-t border-border text-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-muted"
        >
          Built on Base with MiniKit
        </Button>
      </footer>
    </div>
  );
}
