
"use client";

import { Star, Award, Crown, Zap } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { Badge as BadgeType } from "../lib/types";

interface BadgeDisplayProps {
  badge: BadgeType;
  size?: "small" | "large";
  owned?: boolean;
}

export function BadgeDisplay({ badge, size = "small", owned = true }: BadgeDisplayProps) {
  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary": return <Crown className="w-4 h-4 text-warning" />;
      case "epic": return <Zap className="w-4 h-4 text-primary" />;
      case "rare": return <Award className="w-4 h-4 text-accent" />;
      default: return <Star className="w-4 h-4 text-muted" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "warning";
      case "epic": return "primary";
      case "rare": return "success";
      default: return "default";
    }
  };

  if (size === "small") {
    return (
      <div className={`flex items-center gap-sm p-md rounded-md border ${owned ? 'bg-surface border-border' : 'bg-muted/20 border-muted/40 opacity-60'}`}>
        <span className="text-lg">{badge.imageUrl}</span>
        <div className="flex-1 min-w-0">
          <p className="text-caption font-medium truncate">{badge.name}</p>
        </div>
        {getRarityIcon(badge.rarity)}
      </div>
    );
  }

  return (
    <Card className={owned ? "" : "opacity-60"}>
      <div className="text-center space-y-md">
        <div className="text-4xl">{badge.imageUrl}</div>
        <div className="space-y-sm">
          <div className="flex items-center justify-center gap-sm">
            <h3 className="text-body font-medium">{badge.name}</h3>
            {getRarityIcon(badge.rarity)}
          </div>
          <Badge variant={getRarityColor(badge.rarity) as any}>
            {badge.rarity}
          </Badge>
        </div>
        <p className="text-caption">{badge.description}</p>
      </div>
    </Card>
  );
}
