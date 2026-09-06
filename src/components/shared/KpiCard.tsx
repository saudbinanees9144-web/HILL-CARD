import type { ReactNode } from "react";
import { type LucideIcon } from "lucide-react";

export function KpiCard({
  icon: Icon,
  label,
  value,
  color = "blue",
  sublabel,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color?: "blue" | "red" | "orange" | "green" | "yellow" | "indigo";
  sublabel?: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    red: "bg-red-50 text-red-700 border-red-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };
  return (
    <div className={`rounded-lg border p-4 ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide opacity-80">{label}</span>
        <Icon size={18} className="opacity-60" />
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
      {sublabel && <div className="text-xs opacity-60 mt-0.5">{sublabel}</div>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ title, icon: Icon, action }: { title: string; icon?: LucideIcon; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
        {Icon && <Icon size={18} className="text-gray-500" />}
        {title}
      </h3>
      {action}
    </div>
  );
}

export function DemoBadge() {
  return (
    <span className="inline-block text-[10px] font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">
      DEMO DATA
    </span>
  );
}
