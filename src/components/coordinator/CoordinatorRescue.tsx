import { useApp, getLocationPath } from "@/store/AppContext";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { Shield, ArrowRight, Clock } from "lucide-react";

export function CoordinatorRescue() {
  const { rescueRequests, advanceRescueTimeline } = useApp();

  return (
    <Card className="p-4">
      <SectionHeader title="Rescue Operations" icon={Shield} action={<DemoBadge />} />

      <div className="space-y-3">
        {rescueRequests.map((req) => {
          const path = getLocationPath(req.locationId);
          const locName = path.slice(-2).join(", ");
          const statusColor =
            req.status === "Completed" ? "text-green-600 bg-green-100"
            : req.status === "Dispatched" || req.status === "Approaching" ? "text-orange-600 bg-orange-100"
            : "text-blue-600 bg-blue-100";

          return (
            <div key={req.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700">{req.id}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusColor}`}>{req.status.toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">{req.category} · {req.people} people</div>
                  <div className="text-xs text-gray-500 mt-0.5">{locName} · {req.gps.lat}°N, {req.gps.lng}°E</div>
                  {req.message && <div className="text-xs text-gray-400 mt-0.5">"{req.message}"</div>}
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-700"><span className="text-gray-400">Team:</span> <span className="font-semibold">{req.teamName || "—"}</span></div>
                  <div className="text-gray-700"><span className="text-gray-400">Distance:</span> <span className="font-semibold">{req.distance || "—"} km</span></div>
                  <div className="text-gray-700"><span className="text-gray-400">ETA:</span> <span className="font-semibold">{req.eta || "—"} min</span></div>
                </div>
              </div>

              {/* Mini timeline */}
              <div className="mt-3 flex items-center gap-1 flex-wrap">
                {req.timeline.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`flex items-center gap-1 text-xs px-1.5 py-0.5 rounded ${step.done ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {step.done && <span>✓</span>}
                      <span>{step.label}</span>
                      {step.done && step.time !== "—" && <span className="text-gray-400">({step.time})</span>}
                    </div>
                    {i < req.timeline.length - 1 && <ArrowRight size={10} className="text-gray-300" />}
                  </div>
                ))}
              </div>

              {req.status !== "Completed" && (
                <button
                  onClick={() => advanceRescueTimeline(req.id)}
                  className="mt-3 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Clock size={12} />
                  Advance Status (Demo)
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
