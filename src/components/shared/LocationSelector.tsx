import { useApp, getLocationPath } from "@/store/AppContext";
import { locations } from "@/data/demoData";
import { ChevronRight, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LocationSelector() {
  const { selectedLocationId, setSelectedLocationId } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const path = getLocationPath(selectedLocationId);
  const leafNodes = locations.filter((l) => l.level === "Village" || l.level === "Block" || l.level === "GPS");

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors max-w-full"
      >
        <MapPin size={16} className="shrink-0" />
        <span className="truncate">{path.join(" › ")}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-80 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b">Select Location</div>
          {leafNodes.map((l) => {
            const lpath = getLocationPath(l.id);
            return (
              <button
                key={l.id}
                onClick={() => {
                  setSelectedLocationId(l.id);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors flex items-start gap-1 ${
                  l.id === selectedLocationId ? "font-bold text-blue-700 bg-blue-50" : "text-gray-700"
                }`}
              >
                <ChevronRight size={14} className="mt-0.5 shrink-0 text-gray-400" />
                <span>{lpath.join(" › ")}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
