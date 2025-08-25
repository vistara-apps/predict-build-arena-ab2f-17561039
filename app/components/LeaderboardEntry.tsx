
"use client";

import { Trophy, TrendingUp, Star } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { formatAmount } from "../lib/utils";
import type { LeaderboardEntry } from "../lib/types";

interface LeaderboardEntryProps {
  entry: LeaderboardEntry;
  highlighted?: boolean;
}

export function LeaderboardEntry({ entry, highlighted = false }: LeaderboardEntryProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-warning" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-muted" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-[#CD7F32]" />;
    return <span className="w-5 h-5 flex items-center justify-center text-body font-bold">#{rank}</span>;
  };

  return (
    <Card className={highlighted ? "ring-2 ring-primary/50" : ""}>
      <div className="flex items-center gap-lg">
        {/* Rank */}
        <div className="flex-shrink-0">
          {getRankIcon(entry.rank)}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-md flex-1">
          {entry.user.avatar && (
            <img 
              src={entry.user.avatar} 
              alt={entry.user.username}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div className="flex-1">
            <p className="text-body font-medium">@{entry.user.username}</p>
            <div className="flex items-center gap-md">
              <span className="text-caption">{entry.score} points</span>
              <span className="text-caption">•</span>
              <span className="text-caption">{entry.successfulPredictions} predictions</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-right space-y-sm">
          <div className="flex items-center gap-sm">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-caption">{formatAmount(entry.totalStaked)}</span>
          </div>
          <div className="flex items-center gap-sm justify-end">
            <Star className="w-4 h-4 text-warning" />
            <span className="text-caption">{entry.badges.length} badges</span>
          </div>
        </div>
      </div>

      {/* Badges */}
      {entry.badges.length > 0 && (
        <div className="mt-lg flex flex-wrap gap-sm">
          {entry.badges.slice(0, 3).map((badge) => (
            <Badge key={badge.badgeId} variant="primary">
              {badge.imageUrl} {badge.name}
            </Badge>
          ))}
          {entry.badges.length > 3 && (
            <Badge variant="default">+{entry.badges.length - 3} more</Badge>
          )}
        </div>
      )}
    </Card>
  );
}
