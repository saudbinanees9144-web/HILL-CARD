import { useState } from "react";
import { useApp, getRiskForLocation } from "@/store/AppContext";
import { SimMap, LayerToggle, type MapLayers } from "@/components/shared/SimMap";
import { Modal } from "@/components/shared/Modal";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Card, DemoBadge } from "@/components/shared/KpiCard";
import { riskZones, shelters, rescueTeams } from "@/data/demoData";
import type { RiskZone } from "@/data/types";

export function CitizenMap() {
  const { selectedLocationId, incidents, citizenReports } = useApp();
  const [layers, setLayers] = useState<MapLayers>({
    riskZones: true,
    incidents: true,
    reports: true,
    shelters: true,
    rescueTeams: true,
  });
  const [selectedZone, setSelectedZone] = useState<RiskZone | null>(null);

  const locZones = riskZones.filter((z) => z.locationId === selectedLocationId);
  const locIncidents = incidents.filter((i) => i.locationId === selectedLocationId);
  const locShelters = shelters.filter((s) => s.locationId === selectedLocationId);
  const locReports = citizenReports.filter((r) => r.locationId === selectedLocationId);

  return (
    <div className="space-y-3 pb-4">
      <Card className="p-3">
        <div className="mb-2">
          <LayerToggle layers={layers} setLayers={setLayers} />
        </div>
        <SimMap
          zones={locZones.length ? locZones : riskZones}
          incidents={locIncidents}
          reports={locReports}
          shelters={locShelters}
          teams={rescueTeams}
          layers={layers}
          onZoneClick={setSelectedZone}
          height="h-80"
        />
      </Card>

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
              <Info label="Confidence" value={`${selectedZone.confidence}% (DEMO)`} />
              <Info label="Risk Level" value={selectedZone.risk} />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
              <div className="text-xs font-semibold text-orange-700 uppercase mb-1">Recommended Action</div>
              <p className="text-sm text-gray-800">{selectedZone.recommendedAction}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
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
