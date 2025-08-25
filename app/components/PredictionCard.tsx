
"use client";

import { TrendingUp, Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatAmount, formatDate } from "../lib/utils";
import type { Prediction } from "../lib/types";

interface PredictionCardProps {
  prediction: Prediction;
  variant?: "active" | "resolved";
  onStake?: (predictionId: string) => void;
  onViewDetails?: (predictionId: string) => void;
}

export function PredictionCard({ 
  prediction, 
  variant = "active",
  onStake,
  onViewDetails 
}: PredictionCardProps) {
  const isResolved = prediction.status === "resolved";
  const isSuccessful = prediction.successRate && prediction.successRate >= 80;

  return (
    <Card className="animate-fade-in">
      <div className="space-y-lg">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-md">
            {prediction.user?.avatar && (
              <img 
                src={prediction.user.avatar} 
                alt={prediction.user.username}
                className="w-8 h-8 rounded-full"
              />
            )}
            <div>
              <p className="text-body font-medium">@{prediction.user?.username}</p>
              <p className="text-caption">{formatDate(prediction.createdAt)}</p>
            </div>
          </div>
          <Badge variant={isResolved ? (isSuccessful ? "success" : "warning") : "primary"}>
            {prediction.status}
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-md">
          <h3 className="text-display">{prediction.featureDescription}</h3>
          <p className="text-body text-muted">{prediction.predictionQuery}</p>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-sm">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-caption">{formatAmount(prediction.stakedAmount)}</span>
          </div>
          <div className="flex items-center gap-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-caption">{prediction.totalStakers} stakers</span>
          </div>
          {isResolved && prediction.successRate && (
            <div className="flex items-center gap-sm">
              {isSuccessful ? (
                <CheckCircle className="w-4 h-4 text-success" />
              ) : (
                <XCircle className="w-4 h-4 text-error" />
              )}
              <span className="text-caption">{prediction.successRate}% success</span>
            </div>
          )}
          {!isResolved && (
            <div className="flex items-center gap-sm">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-caption">Active</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-md">
          {!isResolved && onStake && (
            <Button 
              variant="accent" 
              size="sm"
              onClick={() => onStake(prediction.predictionId)}
              icon={<TrendingUp className="w-4 h-4" />}
            >
              Stake
            </Button>
          )}
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onViewDetails?.(prediction.predictionId)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}
