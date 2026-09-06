import { useApp, getLocationPath, getRiskForLocation } from "@/store/AppContext";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { LocationSelector } from "@/components/shared/LocationSelector";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Card, DemoBadge } from "@/components/shared/KpiCard";
import { shelters, weatherData } from "@/data/demoData";
import { riskColors } from "@/data/translations";
import { Mountain, Bell, Siren, Volume2, MapPin, Clock, TrendingUp, CloudRain, AlertTriangle, Home, Phone } from "lucide-react";
import type { CitizenPage } from "@/App";

export function CitizenHome({ onNavigate }: { onNavigate: (page: CitizenPage) => void }) {
  const { t, selectedLocationId } = useApp();
  const path = getLocationPath(selectedLocationId);
  const risk = getRiskForLocation(selectedLocationId);
  const c = riskColors[risk.risk];
  const weather = weatherData.find((w) => w.locationId === selectedLocationId) || weatherData[0];
  const nearestShelter = shelters.find((s) => s.locationId === selectedLocationId) || shelters[0];

  return (
    <div className="space-y-4 pb-4">
      {/* Demo data banner */}
      <div className="text-center text-xs font-bold text-gray-500 bg-yellow-50 border border-yellow-200 rounded-md py-1.5">
        {t.demoData}
      </div>

      {/* Risk card */}
      <Card className={`p-5 ${c.bg} ${c.border} border-2`}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <MapPin size={14} />
              {path.join(" › ")}
            </div>
            <div className="mt-3 text-sm font-medium text-gray-600">{t.currentRisk}</div>
            <div className="mt-1 flex items-center gap-3">
              <RiskBadge level={risk.risk} size="lg" />
              <span className="text-3xl font-bold text-gray-900">{risk.probability}%</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">{t.riskProbability}: {risk.probability}% · Confidence: {risk.confidence}% (DEMO)</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{t.lastUpdated}</div>
            <div className="text-sm font-semibold text-gray-700">09:45 AM</div>
            <div className="text-xs text-gray-400">Sep 6, 2026</div>
          </div>
        </div>
      </Card>

      {/* Emergency actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate("rescue")}
          className="flex flex-col items-center justify-center gap-1 bg-red-600 text-white rounded-lg p-4 shadow-md hover:bg-red-700 active:scale-95 transition-all"
        >
          <Siren size={28} />
          <span className="font-bold text-sm">{t.iNeedRescue}</span>
        </button>
        <button
          onClick={() => onNavigate("report")}
          className="flex flex-col items-center justify-center gap-1 bg-orange-500 text-white rounded-lg p-4 shadow-md hover:bg-orange-600 active:scale-95 transition-all"
        >
          <AlertTriangle size={28} />
          <span className="font-bold text-sm">{t.reportHazard}</span>
        </button>
      </div>

      {/* Quick nav */}
      <div className="grid grid-cols-4 gap-2">
        <NavButton icon={MapPin} label="Map" onClick={() => onNavigate("map")} />
        <NavButton icon={AlertTriangle} label="Warning" onClick={() => onNavigate("warning")} />
        <NavButton icon={Home} label="Shelters" onClick={() => onNavigate("shelters")} />
        <NavButton icon={Bell} label="Alerts" onClick={() => onNavigate("warning")} />
      </div>

      {/* Weather summary */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
            <CloudRain size={16} className="text-blue-500" />
            Weather (DEMO)
          </h3>
          <DemoBadge />
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <Stat label="Rainfall" value={`${weather.rainfall}mm`} />
          <Stat label="24h Rain" value={`${weather.rainfall24h}mm`} />
          <Stat label="Humidity" value={`${weather.humidity}%`} />
        </div>
        <p className="mt-2 text-xs text-gray-500">{weather.forecast}</p>
      </Card>

      {/* Nearest shelter quick info */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
            <Home size={16} className="text-green-600" />
            {t.nearestShelter}
          </h3>
          <DemoBadge />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-gray-800 text-sm">{nearestShelter.name}</div>
            <div className="text-xs text-gray-500">{nearestShelter.distance} km · Capacity {nearestShelter.capacity} · {nearestShelter.status}</div>
          </div>
          <button
            onClick={() => onNavigate("shelters")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View All →
          </button>
        </div>
      </Card>

      {/* Helpline */}
      <Card className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone size={18} className="text-red-600" />
          <div>
            <div className="text-sm font-semibold text-gray-800">{t.emergencyHelpline}</div>
            <div className="text-xs text-gray-500">112 / 1070 (Disaster Management)</div>
          </div>
        </div>
        <a href="tel:112" className="bg-red-600 text-white text-sm font-semibold px-4 py-1.5 rounded-md hover:bg-red-700 transition-colors">
          Call
        </a>
      </Card>
    </div>
  );
}

function NavButton({ icon: Icon, label, onClick }: { icon: typeof MapPin; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 bg-white border border-gray-200 rounded-lg p-2.5 hover:bg-gray-50 active:scale-95 transition-all"
    >
      <Icon size={20} className="text-gray-600" />
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
