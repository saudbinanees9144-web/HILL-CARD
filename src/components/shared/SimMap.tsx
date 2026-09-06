import { useState } from "react";
import type { RiskZone, Incident, Shelter, RescueTeam, CitizenReport } from "@/data/types";
import { riskColors } from "@/data/translations";
import { RiskDot } from "./RiskBadge";
import { MapPin, AlertTriangle, Home, Users, Flag, Search, Plus, Minus } from "lucide-react";

export interface MapLayers {
  riskZones: boolean;
  incidents: boolean;
  reports: boolean;
  shelters: boolean;
  rescueTeams: boolean;
}

interface SimMapProps {
  zones: RiskZone[];
  incidents: Incident[];
  reports: CitizenReport[];
  shelters: Shelter[];
  teams: RescueTeam[];
  layers: MapLayers;
  onZoneClick?: (z: RiskZone) => void;
  onIncidentClick?: (i: Incident) => void;
  showControls?: boolean;
  height?: string;
  riskFilter?: string;
}

export function SimMap({
  zones,
  incidents,
  reports,
  shelters,
  teams,
  layers,
  onZoneClick,
  onIncidentClick,
  height = "h-96",
  riskFilter = "all",
}: SimMapProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const filteredZones = riskFilter === "all" ? zones : zones.filter((z) => z.risk === riskFilter);

  function handleMouseDown(e: React.MouseEvent) {
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }
  function handleMouseMove(e: React.MouseEvent) {
    if (!dragStart) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }
  function handleMouseUp() {
    setDragStart(null);
  }

  return (
    <div className={`relative w-full ${height} bg-gray-100 rounded-lg border border-gray-300 overflow-hidden select-none`}>
      {/* Grid background */}
      <div
        className="absolute inset-0 cursor-grab"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Terrain shapes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
          <path d={`M0,${60}% Q30%,${20}% 60%,${40}% T100%,${30}% L100%,100% L0,100% Z`} fill="#84cc16" />
          <path d={`M0,${75}% Q40%,${50}% 70%,${65}% T100%,${55}% L100%,100% L0,100% Z`} fill="#65a30d" />
          <path d="M10%,80% Q35%,60% 55%,75% T90%,70% L90%,100% L10%,100% Z" fill="#4d7c0f" />
        </svg>

        {/* Risk zones */}
        {layers.riskZones &&
          filteredZones.map((z) => {
            const c = riskColors[z.risk];
            return (
              <div
                key={z.id}
                onClick={() => onZoneClick?.(z)}
                className={`absolute rounded-full ${c.solid} cursor-pointer transition-all hover:scale-105 hover:opacity-90 ${dragStart ? "" : "animate-pulse"}`}
                style={{
                  left: `${z.center.x}%`,
                  top: `${z.center.y}%`,
                  width: `${z.radius * 2 * zoom}%`,
                  height: `${z.radius * 2 * zoom}%`,
                  transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
                  opacity: 0.35,
                }}
              >
                <div className={`absolute inset-0 rounded-full border-2 ${c.solid}`} style={{ opacity: 0.8 }} />
              </div>
            );
          })}

        {/* Incidents */}
        {layers.incidents &&
          incidents.map((inc, i) => (
            <div
              key={inc.id}
              onClick={() => onIncidentClick?.(inc)}
              className="absolute cursor-pointer hover:scale-125 transition-transform"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 12}%`,
                transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center shadow-md">
                <AlertTriangle size={12} className="text-white" />
              </div>
            </div>
          ))}

        {/* Citizen reports */}
        {layers.reports &&
          reports.map((r, i) => (
            <div
              key={r.id}
              className="absolute pointer-events-none"
              style={{
                left: `${15 + i * 18}%`,
                top: `${50 + i * 8}%`,
                transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
              }}
            >
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shadow">
                <Flag size={10} className="text-white" />
              </div>
            </div>
          ))}

        {/* Shelters */}
        {layers.shelters &&
          shelters.map((s, i) => (
            <div
              key={s.id}
              className="absolute pointer-events-none"
              style={{
                left: `${70 - i * 12}%`,
                top: `${65 + i * 6}%`,
                transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
              }}
            >
              <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center shadow-md">
                <Home size={12} className="text-white" />
              </div>
            </div>
          ))}

        {/* Rescue teams */}
        {layers.rescueTeams &&
          teams.map((t, i) => (
            <div
              key={t.id}
              className="absolute pointer-events-none"
              style={{
                left: `${50 + i * 10}%`,
                top: `${40 + i * 8}%`,
                transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
              }}
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                <Users size={12} className="text-white" />
              </div>
            </div>
          ))}

        {/* Current location marker */}
        <div
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <div className="relative">
            <div className="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-200 shadow-lg" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-gray-700 bg-white/80 px-1.5 rounded">
              You
            </div>
          </div>
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute right-2 top-2 flex flex-col gap-1">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.3, 2.5))}
          className="w-8 h-8 bg-white border border-gray-300 rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.3, 0.5))}
          className="w-8 h-8 bg-white border border-gray-300 rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute left-2 bottom-2 bg-white/90 rounded-md border border-gray-200 px-2.5 py-2 text-xs space-y-1">
        {layers.riskZones && (
          <div className="flex items-center gap-1.5">
            <RiskDot level="LOW" /> <RiskDot level="MODERATE" /> <RiskDot level="HIGH" /> <RiskDot level="CRITICAL" />
            <span className="text-gray-600 ml-1">Risk Zones</span>
          </div>
        )}
        <div className="flex items-center gap-3">
          {layers.incidents && <span className="flex items-center gap-1"><AlertTriangle size={11} className="text-red-600" /> Incident</span>}
          {layers.reports && <span className="flex items-center gap-1"><Flag size={11} className="text-blue-500" /> Report</span>}
          {layers.shelters && <span className="flex items-center gap-1"><Home size={11} className="text-green-600" /> Shelter</span>}
          {layers.rescueTeams && <span className="flex items-center gap-1"><Users size={11} className="text-indigo-600" /> Team</span>}
        </div>
      </div>

      {/* DEMO DATA label */}
      <div className="absolute right-2 bottom-2 text-[10px] font-bold text-gray-400 bg-white/70 px-2 py-0.5 rounded">
        SIMULATED MAP — DEMO DATA
      </div>
    </div>
  );
}

export function LayerToggle({
  layers,
  setLayers,
}: {
  layers: MapLayers;
  setLayers: (l: MapLayers) => void;
}) {
  const items: { key: keyof MapLayers; label: string }[] = [
    { key: "riskZones", label: "Risk Zones" },
    { key: "incidents", label: "Incidents" },
    { key: "reports", label: "Citizen Reports" },
    { key: "shelters", label: "Shelters" },
    { key: "rescueTeams", label: "Rescue Teams" },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.key}
          onClick={() => setLayers({ ...layers, [item.key]: !layers[item.key] })}
          className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
            layers[item.key]
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function MapSearch() {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search location..."
        className="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
