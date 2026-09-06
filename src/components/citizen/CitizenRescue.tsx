import { useState } from "react";
import { useApp, getLocationPath } from "@/store/AppContext";
import { Card } from "@/components/shared/KpiCard";
import { rescueTeams } from "@/data/demoData";
import { Siren, MapPin, Users, Radio, Send, CheckCircle2, ArrowRight, Clock } from "lucide-react";
import type { RescueRequest } from "@/data/types";

export function CitizenRescue() {
  const { t, selectedLocationId, addRescueRequest, nextRescueId } = useApp();
  const path = getLocationPath(selectedLocationId);
  const [submitted, setSubmitted] = useState<RescueRequest | null>(null);
  const [form, setForm] = useState({
    people: 1,
    category: "Trapped by Landslide",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = nextRescueId();
    const now = new Date().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit" }).replace(",", "");
    const availableTeam = rescueTeams.find((tm) => tm.status === "Available" && tm.baseLocationId === selectedLocationId) || rescueTeams[0];
    const distance = Math.round((Math.random() * 5 + 1) * 10) / 10;
    const eta = Math.round(distance * 3 + 2);

    const req: RescueRequest = {
      id,
      citizenName: "Citizen (Demo)",
      locationId: selectedLocationId,
      gps: { lat: 25.9, lng: 93.0 },
      people: form.people,
      category: form.category,
      message: form.message,
      networkStatus: "Active",
      teamId: availableTeam.id,
      teamName: availableTeam.name,
      distance,
      eta,
      status: "Dispatched",
      createdAt: now,
      timeline: [
        { label: "Emergency Request", time: now, done: true },
        { label: "Location Captured", time: now, done: true },
        { label: "Request Received", time: now, done: true },
        { label: "Team Assigned", time: now, done: true },
        { label: "Dispatched", time: now, done: true },
        { label: "Approaching", time: "—", done: false },
        { label: "Rescue Completed", time: "—", done: false },
      ],
    };
    addRescueRequest(req);
    setSubmitted(req);
  }

  if (submitted) {
    return (
      <div className="space-y-3 pb-4">
        <Card className="p-5 text-center">
          <CheckCircle2 size={48} className="text-green-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900">{t.rescueSent}</h2>
          <div className="mt-4 text-left space-y-2.5 bg-gray-50 rounded-md p-4">
            <Row label={t.nearestRescueTeam} value={submitted.teamName || "Team Alpha"} />
            <Row label={t.distance} value={`${submitted.distance} km`} />
            <Row label={t.eta} value={`${submitted.eta} min`} />
            <Row label={t.status} value={<span className="font-bold text-orange-600">{submitted.status}</span>} />
            <Row label="Request ID" value={submitted.id} />
          </div>
        </Card>

        {/* Rescue tracking timeline */}
        <Card className="p-4">
          <h3 className="font-bold text-gray-800 text-sm mb-3">Rescue Tracking</h3>
          <div className="space-y-0">
            {submitted.timeline.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step.done ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400"}`}>
                    {step.done ? "✓" : i + 1}
                  </div>
                  {i < submitted.timeline.length - 1 && (
                    <div className={`w-0.5 h-8 ${step.done ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
                <div className="pt-1">
                  <div className={`text-sm font-medium ${step.done ? "text-gray-800" : "text-gray-400"}`}>{step.label}</div>
                  <div className="text-xs text-gray-400">{step.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <button
          onClick={() => setSubmitted(null)}
          className="w-full text-sm font-semibold text-blue-600 hover:text-blue-700 py-2"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 pb-4">
      <div className="bg-red-600 text-white rounded-lg p-4 text-center">
        <Siren size={32} className="mx-auto mb-1 animate-pulse" />
        <h2 className="text-lg font-bold">{t.iNeedRescue}</h2>
      </div>

      <Card className="p-4 space-y-3">
        <div>
          <label className="text-xs font-semibold text-gray-600">{t.location} (Simulated GPS)</label>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-2">
            <MapPin size={14} className="text-red-500" />
            {path.join(" › ")} · 25.90°N, 93.00°E
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600">Number of People</label>
          <input
            type="number"
            min={1}
            value={form.people}
            onChange={(e) => setForm({ ...form, people: parseInt(e.target.value) || 1 })}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600">Emergency Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option>Trapped by Landslide</option>
            <option>Trapped by Mudslide</option>
            <option>Flood Rescue</option>
            <option>Medical Emergency</option>
            <option>Structural Collapse</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600">Message (Optional)</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={2}
            placeholder="Describe your situation..."
            className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600">Network Status</label>
          <div className="mt-1 flex items-center gap-1.5 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md p-2">
            <Radio size={14} />
            Active — GPS location available
          </div>
        </div>
      </Card>

      <button
        type="submit"
        className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Send size={18} />
        Send Rescue Request
      </button>
    </form>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-800">{value}</span>
    </div>
  );
}
