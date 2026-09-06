import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Language, Incident, RescueRequest, AlertItem, CitizenReport } from "@/data/types";
import {
  initialIncidents,
  initialRescueRequests,
  initialAlerts,
  initialCitizenReports,
  locations,
  riskZones,
} from "@/data/demoData";
import { translations } from "@/data/translations";

type Role = "citizen" | "coordinator" | null;

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  t: (typeof translations)[Language];
  selectedLocationId: string;
  setSelectedLocationId: (id: string) => void;
  incidents: Incident[];
  addIncident: (i: Incident) => void;
  updateIncident: (id: string, patch: Partial<Incident>) => void;
  rescueRequests: RescueRequest[];
  addRescueRequest: (r: RescueRequest) => void;
  updateRescueRequest: (id: string, patch: Partial<RescueRequest>) => void;
  advanceRescueTimeline: (id: string) => void;
  alerts: AlertItem[];
  addAlert: (a: AlertItem) => void;
  citizenReports: CitizenReport[];
  addCitizenReport: (r: CitizenReport) => void;
  nextIncidentId: () => string;
  nextRescueId: () => string;
}

const AppContext = createContext<AppState | null>(null);

let incidentCounter = 127;
let rescueCounter = 43;

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [selectedLocationId, setSelectedLocationId] = useState("haflong");
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [rescueRequests, setRescueRequests] = useState<RescueRequest[]>(initialRescueRequests);
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(initialCitizenReports);

  const t = translations[language];

  const addIncident = useCallback((i: Incident) => {
    setIncidents((prev) => [i, ...prev]);
  }, []);

  const updateIncident = useCallback((id: string, patch: Partial<Incident>) => {
    setIncidents((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const addRescueRequest = useCallback((r: RescueRequest) => {
    setRescueRequests((prev) => [r, ...prev]);
  }, []);

  const updateRescueRequest = useCallback((id: string, patch: Partial<RescueRequest>) => {
    setRescueRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const advanceRescueTimeline = useCallback((id: string) => {
    setRescueRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const idx = r.timeline.findIndex((s) => !s.done);
        if (idx === -1) return r;
        const now = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
        const newTimeline = r.timeline.map((s, i) =>
          i === idx ? { ...s, done: true, time: now } : s
        );
        const statuses = ["Request Received", "Assigned", "Dispatched", "Approaching", "On Site", "Completed"] as const;
        const doneCount = newTimeline.filter((s) => s.done).length;
        const newStatus = statuses[Math.min(doneCount - 2, statuses.length - 1)] || r.status;
        return { ...r, timeline: newTimeline, status: newStatus };
      })
    );
  }, []);

  const addAlert = useCallback((a: AlertItem) => {
    setAlerts((prev) => [a, ...prev]);
  }, []);

  const addCitizenReport = useCallback((r: CitizenReport) => {
    setCitizenReports((prev) => [r, ...prev]);
  }, []);

  const nextIncidentId = useCallback(() => {
    incidentCounter += 1;
    return `LS-2026-${String(incidentCounter).padStart(5, "0")}`;
  }, []);

  const nextRescueId = useCallback(() => {
    rescueCounter += 1;
    return `RR-2026-${String(rescueCounter).padStart(4, "0")}`;
  }, []);

  const value: AppState = {
    role,
    setRole,
    language,
    setLanguage,
    t,
    selectedLocationId,
    setSelectedLocationId,
    incidents,
    addIncident,
    updateIncident,
    rescueRequests,
    addRescueRequest,
    updateRescueRequest,
    advanceRescueTimeline,
    alerts,
    addAlert,
    citizenReports,
    addCitizenReport,
    nextIncidentId,
    nextRescueId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function getLocationPath(locationId: string): string[] {
  const path: string[] = [];
  let current = locations.find((l) => l.id === locationId);
  while (current) {
    path.unshift(current.name);
    current = current.parent ? locations.find((l) => l.id === current!.parent) : undefined;
  }
  return path;
}

export function getRiskForLocation(locationId: string) {
  return riskZones.find((rz) => rz.locationId === locationId) || riskZones[0];
}
