import { useApp, getLocationPath } from "@/store/AppContext";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Incident } from "@/data/types";

export function CoordinatorIncidents() {
  const { incidents, updateIncident } = useApp();

  const responseStatuses: Incident["response"][] = ["New", "Under Review", "Verified", "Responding", "Resolved"];
  const verificationStatuses: Incident["verification"][] = ["New", "Under Review", "Verified"];

  return (
    <Card className="p-4">
      <SectionHeader title="Incident Monitoring" icon={AlertTriangle} action={<DemoBadge />} />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
              <th className="py-2 pr-3">ID</th>
              <th className="py-2 pr-3">Location</th>
              <th className="py-2 pr-3">Risk</th>
              <th className="py-2 pr-3">Severity</th>
              <th className="py-2 pr-3">People</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Verification</th>
              <th className="py-2 pr-3">Response</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => {
              const path = getLocationPath(inc.locationId);
              const locName = path.slice(-2).join(", ");
              return (
                <tr key={inc.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 pr-3 font-mono text-xs font-bold text-blue-700">{inc.id}</td>
                  <td className="py-2 pr-3 text-gray-700">{locName}</td>
                  <td className="py-2 pr-3"><RiskBadge level={inc.severity === "Critical" ? "CRITICAL" : inc.severity === "High" ? "HIGH" : inc.severity === "Moderate" ? "MODERATE" : "LOW"} size="sm" /></td>
                  <td className="py-2 pr-3 text-gray-700">{inc.severity}</td>
                  <td className="py-2 pr-3 text-gray-700">{inc.peopleAffected}</td>
                  <td className="py-2 pr-3 text-xs text-gray-500">{inc.createdAt}</td>
                  <td className="py-2 pr-3">
                    <select
                      value={inc.verification}
                      onChange={(e) => updateIncident(inc.id, { verification: e.target.value as Incident["verification"] })}
                      className="text-xs border border-gray-300 rounded px-1.5 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {verificationStatuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 pr-3">
                    <select
                      value={inc.response}
                      onChange={(e) => updateIncident(inc.id, { response: e.target.value as Incident["response"] })}
                      className="text-xs border border-gray-300 rounded px-1.5 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {responseStatuses.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <CheckCircle2 size={14} className="text-green-500" />
        Status flow: NEW → UNDER REVIEW → VERIFIED → RESPONDING → RESOLVED
      </div>
    </Card>
  );
}
