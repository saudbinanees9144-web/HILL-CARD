import { useApp } from "@/store/AppContext";
import { KpiCard } from "@/components/shared/KpiCard";
import { riskZones, shelters, rescueTeams } from "@/data/demoData";
import { MapPin, AlertTriangle, Siren, Users, Home, Shield, Activity } from "lucide-react";

export function CoordinatorKpis() {
  const { incidents, rescueRequests } = useApp();

  const highRiskZones = riskZones.filter((z) => z.risk === "HIGH" || z.risk === "CRITICAL").length;
  const criticalAlerts = 2;
  const activeIncidents = incidents.filter((i) => i.response !== "Resolved").length;
  const peopleAtRisk = incidents.reduce((sum, i) => sum + i.peopleAffected, 0);
  const activeRescues = rescueRequests.filter((r) => r.status !== "Completed").length;
  const openShelters = shelters.filter((s) => s.status === "Open").length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      <KpiCard icon={MapPin} label="Monitored Areas" value={12} color="blue" />
      <KpiCard icon={AlertTriangle} label="High-Risk Zones" value={highRiskZones} color="orange" />
      <KpiCard icon={Activity} label="Critical Alerts" value={criticalAlerts} color="red" />
      <KpiCard icon={Siren} label="Active Incidents" value={activeIncidents} color="red" />
      <KpiCard icon={Users} label="People at Risk" value={peopleAtRisk} color="orange" />
      <KpiCard icon={Shield} label="Active Rescues" value={activeRescues} color="indigo" />
      <KpiCard icon={Home} label="Safe Shelters" value={openShelters} color="green" />
    </div>
  );
}
