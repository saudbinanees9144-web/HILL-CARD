import type { RiskLevel } from "@/data/types";
import { riskColors } from "@/data/translations";

export function RiskBadge({ level, size = "md" }: { level: RiskLevel; size?: "sm" | "md" | "lg" }) {
  const c = riskColors[level];
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };
  return (
    <span className={`inline-flex items-center rounded-full font-bold ${c.badge} ${sizes[size]}`}>
      {level}
    </span>
  );
}

export function RiskDot({ level }: { level: RiskLevel }) {
  const c = riskColors[level];
  return <span className={`inline-block w-3 h-3 rounded-full ${c.solid}`} />;
}
