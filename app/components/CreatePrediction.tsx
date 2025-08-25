
"use client";

import { useState } from "react";
import { Plus, TrendingUp } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

interface CreatePredictionProps {
  onCreatePrediction: (data: {
    featureDescription: string;
    predictionQuery: string;
    outcomeThreshold: number;
    stakedAmount: number;
  }) => void;
}

export function CreatePrediction({ onCreatePrediction }: CreatePredictionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [featureDescription, setFeatureDescription] = useState("");
  const [predictionQuery, setPredictionQuery] = useState("");
  const [outcomeThreshold, setOutcomeThreshold] = useState("");
  const [stakedAmount, setStakedAmount] = useState("");

  const handleSubmit = () => {
    if (!featureDescription || !predictionQuery || !outcomeThreshold || !stakedAmount) {
      return;
    }

    onCreatePrediction({
      featureDescription,
      predictionQuery,
      outcomeThreshold: parseFloat(outcomeThreshold),
      stakedAmount: parseFloat(stakedAmount),
    });

    // Reset form
    setFeatureDescription("");
    setPredictionQuery("");
    setOutcomeThreshold("");
    setStakedAmount("");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="primary"
        icon={<Plus className="w-4 h-4" />}
        className="w-full"
      >
        Create New Prediction
      </Button>
    );
  }

  return (
    <Card className="animate-slide-up">
      <div className="space-y-lg">
        <div className="flex items-center gap-md">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-display">Create Prediction</h3>
        </div>

        <div className="space-y-md">
          <div>
            <label className="block text-caption mb-sm">Feature Description</label>
            <Input
              value={featureDescription}
              onChange={(e) => setFeatureDescription(e.target.value)}
              placeholder="e.g., Dark mode toggle will increase user retention by 15%"
            />
          </div>

          <div>
            <label className="block text-caption mb-sm">Prediction Query</label>
            <Input
              value={predictionQuery}
              onChange={(e) => setPredictionQuery(e.target.value)}
              placeholder="e.g., Will dark mode increase 7-day retention from 45% to 60%?"
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="block text-caption mb-sm">Success Threshold</label>
              <Input
                type="number"
                value={outcomeThreshold}
                onChange={(e) => setOutcomeThreshold(e.target.value)}
                placeholder="60"
              />
            </div>
            <div>
              <label className="block text-caption mb-sm">Stake Amount (USDC)</label>
              <Input
                type="number"
                value={stakedAmount}
                onChange={(e) => setStakedAmount(e.target.value)}
                placeholder="25.00"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-md">
          <Button
            onClick={handleSubmit}
            variant="primary"
            icon={<TrendingUp className="w-4 h-4" />}
          >
            Create & Stake
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );
}
