import { useApp } from "@/store/AppContext";
import { Card, DemoBadge } from "@/components/shared/KpiCard";
import { shelters } from "@/data/demoData";
import { Home, Navigation, Phone, Users } from "lucide-react";

export function CitizenShelters() {
  const { t, selectedLocationId } = useApp();
  const locShelters = shelters.filter((s) => s.locationId === selectedLocationId);
  const display = locShelters.length ? locShelters : shelters;

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-gray-900 text-sm">{t.shelters}</h2>
        <DemoBadge />
      </div>

      {display.map((s) => {
        const pct = Math.round((s.occupied / s.capacity) * 100);
        const statusColor = s.status === "Open" ? "text-green-600" : s.status === "Full" ? "text-red-600" : "text-yellow-600";
        return (
          <Card key={s.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <div className="w-9 h-9 rounded-md bg-green-100 flex items-center justify-center shrink-0">
                  <Home size={18} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{s.name}</h3>
                  <div className="text-xs text-gray-500 mt-0.5">{s.distance} km away</div>
                </div>
              </div>
              <span className={`text-xs font-bold ${statusColor}`}>{s.status.toUpperCase()}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-gray-400" />
                <span className="text-gray-600">{t.capacity}: {s.capacity}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={14} className="text-gray-400" />
                <span className="text-gray-600">{s.contact}</span>
              </div>
            </div>

            {/* Occupancy bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Occupancy</span>
                <span>{s.occupied}/{s.capacity} ({pct}%)</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${pct >= 100 ? "bg-red-500" : pct > 70 ? "bg-orange-500" : "bg-green-500"}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>

            <button className="mt-3 w-full flex items-center justify-center gap-1.5 bg-blue-600 text-white text-sm font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors">
              <Navigation size={14} />
              {t.navigate}
            </button>
          </Card>
        );
      })}
    </div>
  );
}
