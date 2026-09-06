import { useApp, getLocationPath } from "@/store/AppContext";
import { Card, DemoBadge, SectionHeader } from "@/components/shared/KpiCard";
import { TreePine } from "lucide-react";

export function LocationHierarchy() {
  const { selectedLocationId, setSelectedLocationId } = useApp();
  const path = getLocationPath(selectedLocationId);

  return (
    <Card className="p-4">
      <SectionHeader title="Location Hierarchy" icon={TreePine} action={<DemoBadge />} />
      <div className="flex items-center gap-1.5 flex-wrap text-sm">
        {path.map((name, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-gray-300">→</span>}
            <span
              className={`px-2 py-1 rounded-md font-medium ${
                i === path.length - 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-400">
        NER → State → District → Block → Village → Exact Location
      </div>
    </Card>
  );
}
