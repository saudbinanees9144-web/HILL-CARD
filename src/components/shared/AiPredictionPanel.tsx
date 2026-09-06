import { useApp, getRiskForLocation } from "@/store/AppContext";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { weatherData } from "@/data/demoData";
import { Brain, CloudRain, Mountain, Layers, History, Users, ArrowDown, Zap } from "lucide-react";

export function AiPredictionPanel() {
  const { selectedLocationId } = useApp();
  const risk = getRiskForLocation(selectedLocationId);
  const weather = weatherData.find((w) => w.locationId === selectedLocationId) || weatherData[0];

  const factors = [
    { icon: CloudRain, label: "Weather", value: risk.factors.weather, detail: `${weather.rainfall}mm rainfall` },
    { icon: Mountain, label: "Terrain", value: risk.factors.terrain, detail: "Steep slope, 35° avg" },
    { icon: Layers, label: "Soil", value: risk.factors.soil, detail: "Saturated, low cohesion" },
    { icon: History, label: "Historical", value: risk.factors.historical, detail: "3 events in 5 years" },
    { icon: Users, label: "Citizen Reports", value: risk.factors.citizen, detail: "12 active reports" },
  ];

  return (
    <Card className="p-4">
      <SectionHeader title="AI/ML Risk Prediction" icon={Brain} action={<DemoBadge />} />

      {/* Input factors */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {factors.map((f) => (
          <div key={f.label} className="border border-gray-200 rounded-md p-2.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600">
              <f.icon size={14} className="text-gray-400" />
              {f.label}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${f.value > 70 ? "bg-red-500" : f.value > 40 ? "bg-orange-500" : "bg-green-500"}`}
                  style={{ width: `${f.value}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gray-700">{f.value}%</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">{f.detail}</div>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ArrowDown size={20} className="text-gray-400" />
      </div>

      {/* AI Model box */}
      <div className="bg-gray-900 text-white rounded-md p-3 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-bold">
          <Zap size={16} className="text-yellow-400" />
          AI/ML MODEL (SIMULATED)
        </div>
        <div className="text-xs text-gray-400 mt-0.5">Weighted ensemble — DEMO inference engine</div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center my-2">
        <ArrowDown size={20} className="text-gray-400" />
      </div>

      {/* Output */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
          <div className="text-xs text-gray-500">Predicted Probability</div>
          <div className="text-2xl font-bold text-gray-900">{risk.probability}%</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
          <div className="text-xs text-gray-500">Risk Classification</div>
          <div className="mt-1 flex justify-center"><RiskBadge level={risk.risk} /></div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-center">
          <div className="text-xs text-gray-500">Confidence</div>
          <div className="text-2xl font-bold text-gray-900">{risk.confidence}%</div>
          <div className="text-[10px] text-gray-400">DEMO VALUE</div>
        </div>
      </div>

      <div className="mt-2 text-center text-xs text-gray-400 font-semibold">
        SIMULATED AI/ML OUTPUT — NOT LIVE DATA
      </div>
    </Card>
  );
}
