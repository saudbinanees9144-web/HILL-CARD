import { useState } from "react";
import { useApp, getLocationPath } from "@/store/AppContext";
import { Card } from "@/components/shared/KpiCard";
import { Camera, CheckCircle2, MapPin } from "lucide-react";
import type { Incident } from "@/data/types";

export function CitizenReport() {
  const { t, selectedLocationId, addIncident, nextIncidentId, addCitizenReport } = useApp();
  const path = getLocationPath(selectedLocationId);
  const [submitted, setSubmitted] = useState<Incident | null>(null);

  const [form, setForm] = useState({
    description: "",
    category: "Ground Crack",
    severity: "High" as Incident["severity"],
    peopleAffected: 1,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = nextIncidentId();
    const now = new Date().toLocaleString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).replace(",", "");
    const incident: Incident = {
      id,
      locationId: selectedLocationId,
      description: form.description,
      category: form.category,
      severity: form.severity,
      peopleAffected: form.peopleAffected,
      gps: { lat: 25.9, lng: 93.0 },
      createdAt: now,
      verification: "New",
      response: "New",
      reporter: "Citizen",
    };
    addIncident(incident);
    addCitizenReport({
      id: `cr-${Date.now()}`,
      locationId: selectedLocationId,
      type: form.category,
      gps: { lat: 25.9, lng: 93.0 },
      note: form.description,
      time: now,
    });
    setSubmitted(incident);
  }

  if (submitted) {
    return (
      <Card className="p-6 text-center">
        <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-gray-900">{t.reportSuccess}</h2>
        <div className="mt-3 bg-gray-50 rounded-md p-3 inline-block">
          <div className="text-xs text-gray-500">Incident ID</div>
          <div className="text-xl font-bold text-blue-700">{submitted.id}</div>
        </div>
        <p className="mt-3 text-sm text-gray-600">
          Your report has been forwarded to the Disaster Management Coordinator.
        </p>
        <button
          onClick={() => {
            setSubmitted(null);
            setForm({ description: "", category: "Ground Crack", severity: "High", peopleAffected: 1 });
          }}
          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Submit Another Report
        </button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pb-4">
      <Card className="p-4">
        <h2 className="font-bold text-gray-900 text-sm mb-3">{t.reportHazard}</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600">{t.description}</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="Describe what you observed..."
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">{t.hazardCategory}</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Ground Crack</option>
              <option>Mudslide</option>
              <option>Rockfall</option>
              <option>Flooding</option>
              <option>Water Flow</option>
              <option>Structural Damage</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">{t.severity}</label>
            <select
              value={form.severity}
              onChange={(e) => setForm({ ...form, severity: e.target.value as Incident["severity"] })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Low</option>
              <option>Moderate</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">{t.peopleAffected}</label>
            <input
              type="number"
              min={1}
              value={form.peopleAffected}
              onChange={(e) => setForm({ ...form, peopleAffected: parseInt(e.target.value) || 1 })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">{t.location} (Simulated GPS)</label>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2">
              <MapPin size={14} className="text-blue-500" />
              {path.join(" › ")} · 25.90°N, 93.00°E
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Photo (Optional)</label>
            <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 text-gray-400">
              <Camera size={24} />
              <span className="ml-2 text-sm">Tap to add photo (demo)</span>
            </div>
          </div>
        </div>
      </Card>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 active:scale-95 transition-all"
      >
        {t.submit}
      </button>
    </form>
  );
}
