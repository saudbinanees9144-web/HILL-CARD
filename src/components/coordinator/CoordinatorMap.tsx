import { useState } from "react";
import { useApp, getLocationPath } from "@/store/AppContext";
import { SimMap, LayerToggle, MapSearch, type MapLayers } from "@/components/shared/SimMap";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { riskZones, shelters, rescueTeams } from "@/data/demoData";
import { Filter } from "lucide-react";
import type { RiskZone } from "@/data/types";
import { Modal } from "@/components/shared/Modal";

export function CoordinatorMap() {
  const { incidents, selectedLocationId, citizenReports } = useApp();
  const [layers, setLayers] = useState<MapLayers>({
    riskZones: true,
    incidents: true,
    reports: true,
    shelters: true,
    rescueTeams: true,
  });
  const [riskFilter, setRiskFilter] = useState("all");
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);

  return (
    <Card className="p-4">
      <SectionHeader title="GIS Map — Command Center" icon={Filter} action={<DemoBadge />} />

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <MapSearch />
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Risk Levels</option>
          <option value="LOW">Low</option>
          <option value="MODERATE">Moderate</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>

      <div className="mb-3">
        <LayerToggle layers={layers} setLayers={setLayers} />
      </div>

      <SimMap
        zones={riskZones}
        incidents={incidents}
        reports={citizenReports}
        shelters={shelters}
        teams={rescueTeams}
        layers={layers}
        onZoneClick={setSelectedZone}
        riskFilter={riskFilter}
        height="h-[500px]"
      />

      <Modal open={!!selectedZone} onClose={() => setSelectedZone(null)} title="Risk Zone Details">
        {selectedZone && (
          <div className="space-y-3">
            <DemoBadge />
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{selectedZone.name}</h3>
              <RiskBadge level={selectedZone.risk} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Info label="Area" value={selectedZone.area} />
              <Info label="Probability" value={`${selectedZone.probability}%`} />
              <Info label="Confidence" value={`${selectedZone.confidence}%`} />
              <Info label="Risk Level" value={selectedZone.risk} />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
              <div className="text-xs font-semibold text-orange-700 uppercase mb-1">Recommended Action</div>
              <p className="text-sm text-gray-800">{selectedZone.recommendedAction}</p>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="font-semibold text-gray-800">{value}</div>
    </div>
  );
}
