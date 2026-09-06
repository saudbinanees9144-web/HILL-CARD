import { useState } from "react";
import { AppProvider, useApp } from "@/store/AppContext";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { LocationSelector } from "@/components/shared/LocationSelector";
import { CitizenHome } from "@/components/citizen/CitizenHome";
import { CitizenMap } from "@/components/citizen/CitizenMap";
import { CitizenWarning } from "@/components/citizen/CitizenWarning";
import { CitizenReport } from "@/components/citizen/CitizenReport";
import { CitizenRescue } from "@/components/citizen/CitizenRescue";
import { CitizenShelters } from "@/components/citizen/CitizenShelters";
import { CoordinatorKpis } from "@/components/coordinator/CoordinatorKpis";
import { CoordinatorMap } from "@/components/coordinator/CoordinatorMap";
import { CoordinatorIncidents } from "@/components/coordinator/CoordinatorIncidents";
import { CoordinatorRescue } from "@/components/coordinator/CoordinatorRescue";
import { CoordinatorAlerts } from "@/components/coordinator/CoordinatorAlerts";
import { AiPredictionPanel } from "@/components/shared/AiPredictionPanel";
import { LocationHierarchy } from "@/components/shared/LocationHierarchy";
import { Mountain, Shield, User, Bell, MapPin, AlertTriangle, Home, FileText, Siren, ArrowLeft } from "lucide-react";

export type CitizenPage = "home" | "map" | "warning" | "report" | "rescue" | "shelters";

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

function AppInner() {
  const { role, setRole } = useApp();

  if (!role) {
    return <RoleSelection onSelect={setRole} />;
  }

  return role === "citizen" ? <CitizenApp onExit={() => setRole(null)} /> : <CoordinatorApp onExit={() => setRole(null)} />;
}

function RoleSelection({ onSelect }: { onSelect: (r: "citizen" | "coordinator") => void }) {
  const { t } = useApp();
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-3">
            <Mountain size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t.appName}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.tagline}</p>
          <p className="text-xs text-gray-400 mt-1">SIH 2026 · Problem SIH26001 · Disaster Management</p>
        </div>

        <div className="text-center mb-4">
          <span className="text-xs font-bold text-gray-500 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
            DEMO DATA — SIMULATED PROTOTYPE
          </span>
        </div>

        <p className="text-center text-sm text-gray-600 mb-6">Select your role to continue</p>

        <div className="space-y-3">
          <button
            onClick={() => onSelect("citizen")}
            className="w-full flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
              <User size={24} className="text-blue-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Citizen</div>
              <div className="text-xs text-gray-500">View risk, receive alerts, report hazards, request rescue</div>
            </div>
          </button>

          <button
            onClick={() => onSelect("coordinator")}
            className="w-full flex items-center gap-3 bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-red-500 hover:shadow-md transition-all text-left"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield size={24} className="text-red-600" />
            </div>
            <div>
              <div className="font-bold text-gray-900">Coordinator / Disaster Admin</div>
              <div className="text-xs text-gray-500">Command center: monitor incidents, manage alerts & rescue</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function CitizenApp({ onExit }: { onExit: () => void }) {
  const { t } = useApp();
  const [page, setPage] = useState<CitizenPage>("home");

  const navItems: { key: CitizenPage; icon: typeof MapPin; label: string }[] = [
    { key: "home", icon: Home, label: "Home" },
    { key: "map", icon: MapPin, label: "Map" },
    { key: "warning", icon: AlertTriangle, label: "Warning" },
    { key: "report", icon: FileText, label: "Report" },
    { key: "rescue", icon: Siren, label: "Rescue" },
    { key: "shelters", icon: Home, label: "Shelters" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Mountain size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">{t.appName}</h1>
              <p className="text-[10px] text-gray-400 leading-tight">Citizen App</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button onClick={onExit} className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Location bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-2">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
          <LocationSelector />
          <Bell size={18} className="text-gray-400 shrink-0" />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4">
        {page === "home" && <CitizenHome onNavigate={setPage} />}
        {page === "map" && <CitizenMap />}
        {page === "warning" && <CitizenWarning />}
        {page === "report" && <CitizenReport />}
        {page === "rescue" && <CitizenRescue />}
        {page === "shelters" && <CitizenShelters />}
      </main>

      {/* Bottom nav */}
      <nav className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-2xl mx-auto flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`flex flex-col items-center gap-0.5 py-2 px-1 flex-1 transition-colors ${
                page === item.key ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

function CoordinatorApp({ onExit }: { onExit: () => void }) {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Mountain size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900 leading-tight">{t.appName}</h1>
              <p className="text-[10px] text-gray-400 leading-tight">Disaster Management Command Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LocationSelector />
            <LanguageSelector />
            <button onClick={onExit} className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 py-4 space-y-4 max-w-[1600px] mx-auto">
        <div className="text-center text-xs font-bold text-gray-500 bg-yellow-50 border border-yellow-200 rounded-md py-1.5">
          DEMO DATA — SIMULATED PROTOTYPE
        </div>

        {/* KPIs */}
        <CoordinatorKpis />

        {/* AI Prediction + Location Hierarchy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AiPredictionPanel />
          </div>
          <div>
            <LocationHierarchy />
          </div>
        </div>

        {/* GIS Map */}
        <CoordinatorMap />

        {/* Incidents + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CoordinatorIncidents />
          <CoordinatorAlerts />
        </div>

        {/* Rescue Operations */}
        <CoordinatorRescue />

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-4">
          HILL CARD — AI-Based Early Warning & Landslide Risk Monitoring · SIH 2026 · Problem SIH26001
        </div>
      </main>
    </div>
  );
}

export default App;
