
"use client";

import { Code, ExternalLink, GitBranch, Loader2 } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatDate } from "../lib/utils";
import type { MVPBuild } from "../lib/types";

interface BuildProgressProps {
  build: MVPBuild;
  onViewCode?: (url: string) => void;
  onViewDemo?: (url: string) => void;
}

export function BuildProgress({ build, onViewCode, onViewDemo }: BuildProgressProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "deployed":
        return <Badge variant="success">Deployed</Badge>;
      case "building":
        return <Badge variant="warning">Building</Badge>;
      case "pending":
        return <Badge variant="default">Pending</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "deployed":
        return <Code className="w-5 h-5 text-success" />;
      case "building":
        return <Loader2 className="w-5 h-5 text-warning animate-spin" />;
      case "pending":
        return <GitBranch className="w-5 h-5 text-muted" />;
      default:
        return <GitBranch className="w-5 h-5 text-muted" />;
    }
  };

  return (
    <Card>
      <div className="space-y-lg">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-md">
            {getStatusIcon(build.status)}
            <div>
              <h3 className="text-body font-medium">MVP Build #{build.buildId}</h3>
              <p className="text-caption">Created {formatDate(build.createdAt)}</p>
            </div>
          </div>
          {getStatusBadge(build.status)}
        </div>

        {/* Progress */}
        <div className="space-y-md">
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                build.status === "deployed" ? "bg-success w-full" :
                build.status === "building" ? "bg-warning w-2/3" :
                "bg-muted w-1/3"
              }`}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-md text-center">
            <div className={`text-caption ${build.status !== "pending" ? "text-success" : "text-muted"}`}>
              Initiated
            </div>
            <div className={`text-caption ${build.status === "deployed" || build.status === "building" ? "text-warning" : "text-muted"}`}>
              Building
            </div>
            <div className={`text-caption ${build.status === "deployed" ? "text-success" : "text-muted"}`}>
              Deployed
            </div>
          </div>
        </div>

        {/* Actions */}
        {build.status === "deployed" && (
          <div className="flex gap-md">
            {build.codeRepositoryUrl && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onViewCode?.(build.codeRepositoryUrl!)}
                icon={<GitBranch className="w-4 h-4" />}
              >
                View Code
              </Button>
            )}
            {build.deployedUrl && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onViewDemo?.(build.deployedUrl!)}
                icon={<ExternalLink className="w-4 h-4" />}
              >
                View Demo
              </Button>
            )}
          </div>
        )}

        {build.status === "building" && (
          <div className="flex items-center gap-md text-caption text-muted">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Building your MVP... This usually takes 5-10 minutes</span>
          </div>
        )}
      </div>
    </Card>
  );
}
