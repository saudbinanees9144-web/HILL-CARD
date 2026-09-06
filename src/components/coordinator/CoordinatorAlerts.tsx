import { useApp, getLocationPath } from "@/store/AppContext";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Bell, MessageSquare, Smartphone, Volume2, Globe } from "lucide-react";

export function CoordinatorAlerts() {
  const { alerts } = useApp();

  const channelIcons: Record<string, typeof Bell> = {
    "SMS": Smartphone,
    "In-App": Bell,
    "Local Language": Globe,
    "Voice Demo": Volume2,
  };

  return (
    <Card className="p-4">
      <SectionHeader title="Alert Management" icon={Bell} action={<DemoBadge />} />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase">
              <th className="py-2 pr-3">Alert</th>
              <th className="py-2 pr-3">Severity</th>
              <th className="py-2 pr-3">Location</th>
              <th className="py-2 pr-3">Risk</th>
              <th className="py-2 pr-3">Trigger Reason</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Channels</th>
              <th className="py-2 pr-3">Delivery</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a) => {
              const path = getLocationPath(a.locationId);
              const locName = path.slice(-2).join(", ");
              return (
                <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 pr-3 font-semibold text-gray-800">{a.title}</td>
                  <td className="py-2 pr-3"><RiskBadge level={a.severity} size="sm" /></td>
                  <td className="py-2 pr-3 text-gray-700">{locName}</td>
                  <td className="py-2 pr-3"><RiskBadge level={a.risk} size="sm" /></td>
                  <td className="py-2 pr-3 text-xs text-gray-600 max-w-[200px]">{a.reason}</td>
                  <td className="py-2 pr-3 text-xs text-gray-500">{a.time}</td>
                  <td className="py-2 pr-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {a.channels.map((ch) => {
                        const Icon = channelIcons[ch] || MessageSquare;
                        return (
                          <span key={ch} className="flex items-center gap-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                            <Icon size={10} />
                            {ch}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-2 pr-3 text-xs text-green-600 font-medium">{a.delivery}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        <Smartphone size={14} className="text-gray-400" />
        SMS delivery is simulated visually. No real SMS service is integrated.
      </div>
    </Card>
  );
}
