import { useApp, getLocationPath, getRiskForLocation } from "@/store/AppContext";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Card, DemoBadge } from "@/components/shared/KpiCard";
import { shelters } from "@/data/demoData";
import { AlertTriangle, MapPin, Clock, Home, Phone, Volume2, Info } from "lucide-react";
import { useState } from "react";

export function CitizenWarning() {
  const { t, selectedLocationId } = useApp();
  const path = getLocationPath(selectedLocationId);
  const risk = getRiskForLocation(selectedLocationId);
  const nearestShelter = shelters.find((s) => s.locationId === selectedLocationId) || shelters[0];
  const [showVoice, setShowVoice] = useState(false);

  return (
    <div className="space-y-3 pb-4">
      {/* Warning banner */}
      <div className="bg-red-600 text-white rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2">
          <AlertTriangle size={24} className="animate-pulse" />
          <h2 className="text-lg font-bold">{t.warningTitle}</h2>
        </div>
        <p className="mt-2 text-sm text-white/90">
          Your area has been classified as <span className="font-bold">HIGH RISK</span>.
        </p>
        <p className="mt-1 text-sm text-white/80">{t.warningReason}</p>
      </div>

      <DemoBadge />

      {/* Warning details */}
      <Card className="p-4 space-y-3">
        <DetailRow icon={MapPin} label={t.location} value={path.join(" › ")} />
        <DetailRow icon={AlertTriangle} label={t.riskLevel} value={<RiskBadge level={risk.risk} />} />
        <DetailRow icon={Clock} label={t.lastUpdated} value="09:45 AM, Sep 6, 2026" />
        <DetailRow icon={Info} label={t.recommendedAction} value={risk.recommendedAction} />
        <DetailRow icon={Home} label={t.nearestShelter} value={`${nearestShelter.name} (${nearestShelter.distance} km)`} />
        <DetailRow icon={Phone} label={t.emergencyHelpline} value="112 / 1070" />
      </Card>

      {/* Voice alert demo button */}
      <button
        onClick={() => setShowVoice(true)}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg p-3 font-semibold text-sm hover:bg-blue-700 transition-colors"
      >
        <Volume2 size={20} />
        {t.voiceAlert}
      </button>

      {showVoice && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-2">
            <Volume2 size={18} className="text-blue-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-blue-900 text-sm">{t.voiceAlert}</div>
              <p className="text-sm text-gray-700 mt-1">{t.voiceAlertMsg}</p>
            </div>
          </div>
          <button
            onClick={() => setShowVoice(false)}
            className="mt-2 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Close
          </button>
        </Card>
      )}

      {/* Active notifications */}
      <Card className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-2 flex items-center gap-1.5">
          <AlertTriangle size={16} className="text-orange-500" />
          {t.notifications}
        </h3>
        <div className="space-y-2">
          <NotifItem time="09:00 AM" text="Landslide risk alert issued for your area" />
          <NotifItem time="08:30 AM" text="Heavy rainfall warning: 286mm in 24 hours" />
          <NotifItem time="07:45 AM" text="Evacuation advisory: prepare to move to shelter" />
        </div>
      </Card>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon size={16} className="text-gray-400 mt-0.5 shrink-0" />
      <div className="flex-1">
        <span className="text-gray-500">{label}: </span>
        <span className="font-semibold text-gray-800">{value}</span>
      </div>
    </div>
  );
}

function NotifItem({ time, text }: { time: string; text: string }) {
  return (
    <div className="flex items-start gap-2 text-sm border-b border-gray-100 pb-2 last:border-0">
      <Clock size={14} className="text-gray-400 mt-0.5 shrink-0" />
      <div>
        <span className="text-xs text-gray-400">{time}</span>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
}
