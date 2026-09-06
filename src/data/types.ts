export type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

export type Language = "en" | "hi" | "as" | "bn" | "ne";

export interface LocationNode {
  id: string;
  level: "NER" | "State" | "District" | "Block" | "Village" | "GPS";
  name: string;
  parent?: string;
  children?: string[];
  gps?: { lat: number; lng: number };
}

export interface RiskZone {
  id: string;
  locationId: string;
  name: string;
  risk: RiskLevel;
  probability: number;
  confidence: number;
  area: string;
  recommendedAction: string;
  center: { x: number; y: number };
  radius: number;
  factors: { weather: number; terrain: number; soil: number; historical: number; citizen: number };
}

export interface WeatherData {
  locationId: string;
  rainfall: number;
  rainfall24h: number;
  humidity: number;
  windSpeed: number;
  forecast: string;
}

export interface Incident {
  id: string;
  locationId: string;
  description: string;
  category: string;
  severity: "Low" | "Moderate" | "High" | "Critical";
  peopleAffected: number;
  gps: { lat: number; lng: number };
  createdAt: string;
  verification: "New" | "Under Review" | "Verified";
  response: "New" | "Under Review" | "Verified" | "Responding" | "Resolved";
  reporter: string;
}

export interface AlertItem {
  id: string;
  locationId: string;
  title: string;
  severity: RiskLevel;
  risk: RiskLevel;
  reason: string;
  time: string;
  channels: string[];
  delivery: string;
}

export interface Shelter {
  id: string;
  name: string;
  locationId: string;
  distance: number;
  capacity: number;
  occupied: number;
  status: "Open" | "Full" | "Preparing";
  contact: string;
  gps: { lat: number; lng: number };
}

export interface RescueTeam {
  id: string;
  name: string;
  baseLocationId: string;
  status: "Available" | "Dispatched" | "On Site" | "Returning";
  personnel: number;
  gps: { lat: number; lng: number };
}

export interface RescueRequest {
  id: string;
  citizenName: string;
  locationId: string;
  gps: { lat: number; lng: number };
  people: number;
  category: string;
  message: string;
  networkStatus: string;
  teamId?: string;
  teamName?: string;
  distance?: number;
  eta?: number;
  status: "Request Received" | "Assigned" | "Dispatched" | "Approaching" | "On Site" | "Completed";
  createdAt: string;
  timeline: { label: string; time: string; done: boolean }[];
}

export interface CitizenReport {
  id: string;
  locationId: string;
  type: string;
  gps: { lat: number; lng: number };
  note: string;
  time: string;
}
