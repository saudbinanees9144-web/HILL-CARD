import type { Language, RiskLevel } from "./types";

export const languages: { code: Language; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "as", label: "Assamese", nativeLabel: "অসমীয়া" },
  { code: "bn", label: "Bengali", nativeLabel: "বাংলা" },
  { code: "ne", label: "Nepali", nativeLabel: "नेपाली" },
];

export const translations: Record<Language, {
  appName: string;
  tagline: string;
  currentLocation: string;
  currentRisk: string;
  riskProbability: string;
  riskLevel: string;
  lastUpdated: string;
  emergency: string;
  notifications: string;
  voiceAlert: string;
  voiceAlertMsg: string;
  warningTitle: string;
  warningReason: string;
  recommendedAction: string;
  nearestShelter: string;
  emergencyHelpline: string;
  reportHazard: string;
  iNeedRescue: string;
  rescueSent: string;
  nearestRescueTeam: string;
  distance: string;
  eta: string;
  status: string;
  shelters: string;
  capacity: string;
  contact: string;
  navigate: string;
  description: string;
  hazardCategory: string;
  severity: string;
  peopleAffected: string;
  location: string;
  submit: string;
  reportSuccess: string;
  demoData: string;
}> = {
  en: {
    appName: "HILL CARD",
    tagline: "AI-Based Early Warning & Landslide Risk Monitoring",
    currentLocation: "Current Location",
    currentRisk: "Current Risk",
    riskProbability: "Risk Probability",
    riskLevel: "Risk Level",
    lastUpdated: "Last Updated",
    emergency: "Emergency SOS",
    notifications: "Notifications",
    voiceAlert: "Voice Alert — Demo",
    voiceAlertMsg: "Voice Alert — Demo Feature. Localized voice alerts can be delivered in the citizen's preferred language.",
    warningTitle: "LANDSLIDE RISK ALERT",
    warningReason: "Heavy rainfall + unfavorable terrain + historical susceptibility.",
    recommendedAction: "Recommended Action",
    nearestShelter: "Nearest Shelter",
    emergencyHelpline: "Emergency Helpline",
    reportHazard: "Report Landslide / Hazard",
    iNeedRescue: "I NEED RESCUE",
    rescueSent: "Rescue request sent.",
    nearestRescueTeam: "Nearest Rescue Team",
    distance: "Distance",
    eta: "ETA",
    status: "Status",
    shelters: "Nearby Shelters",
    capacity: "Capacity",
    contact: "Contact",
    navigate: "Navigate",
    description: "Description",
    hazardCategory: "Hazard Category",
    severity: "Severity",
    peopleAffected: "People Affected",
    location: "Location",
    submit: "Submit Report",
    reportSuccess: "Report successfully submitted.",
    demoData: "DEMO DATA — SIMULATED PROTOTYPE",
  },
  hi: {
    appName: "हिल कार्ड",
    tagline: "एआई आधारित शीघ्र चेतावनी और भूस्खलन जोखिम निगरानी",
    currentLocation: "वर्तमान स्थान",
    currentRisk: "वर्तमान जोखिम",
    riskProbability: "जोखिम संभावना",
    riskLevel: "जोखिम स्तर",
    lastUpdated: "अंतिम अपडेट",
    emergency: "आपातकालीन एसओएस",
    notifications: "सूचनाएं",
    voiceAlert: "वॉइस अलर्ट — डेमो",
    voiceAlertMsg: "वॉइस अलर्ट — डेमो फीचर। नागरिक की पसंदीदा भाषा में स्थानीय वॉइस अलर्ट दिए जा सकते हैं।",
    warningTitle: "भूस्खलन जोखिम अलर्ट",
    warningReason: "भारी वर्षा + प्रतिकूल भूभाग + ऐतिहासिक संवेदनशीलता।",
    recommendedAction: "अनुशंसित कार्रवाई",
    nearestShelter: "निकटतम आश्रय",
    emergencyHelpline: "आपातकालीन हेल्पलाइन",
    reportHazard: "भूस्खलन / खतरे की रिपोर्ट करें",
    iNeedRescue: "मुझे बचाव चाहिए",
    rescueSent: "बचाव अनुरोध भेजा गया।",
    nearestRescueTeam: "निकटतम बचाव टीम",
    distance: "दूरी",
    eta: "अनुमानित समय",
    status: "स्थिति",
    shelters: "निकटवर्ती आश्रय",
    capacity: "क्षमता",
    contact: "संपर्क",
    navigate: "नेविगेट",
    description: "विवरण",
    hazardCategory: "खतरे की श्रेणी",
    severity: "गंभीरता",
    peopleAffected: "प्रभावित लोग",
    location: "स्थान",
    submit: "रिपोर्ट जमा करें",
    reportSuccess: "रिपोर्ट सफलतापूर्वक जमा हो गई।",
    demoData: "डेमो डेटा — सिम्युलेटेड प्रोटोटाइप",
  },
  as: {
    appName: "হিল কাৰ্ড",
    tagline: "এআই ভিত্তিক আগত সতৰ্কবাণী আৰু ভূস্খলন বিপদ নিৰীক্ষণ",
    currentLocation: "বৰ্তমান স্থান",
    currentRisk: "বৰ্তমান বিপদ",
    riskProbability: "বিপদ সম্ভাৱনা",
    riskLevel: "বিপদ স্তৰ",
    lastUpdated: "শেহতীয়া আপডেট",
    emergency: "জৰুৰীকালীন SOS",
    notifications: "জাননী",
    voiceAlert: "ভইচ এলাৰ্ট — ডেমো",
    voiceAlertMsg: "ভইচ এলাৰ্ট — ডেমো বৈশিষ্ট্য। নাগৰিকৰ পছন্দৰ ভাষাত স্থানীয় ভইচ এলাৰ্ট দিব পাৰি।",
    warningTitle: "ভূস্খলন বিপদ এলাৰ্ট",
    warningReason: "গধুৰ বৰষুণ + প্ৰতিকূল ভূভাগ + ঐতিহাসিক সংবেদনশীলতা।",
    recommendedAction: "অনুমোদিত কাৰ্য্য",
    nearestShelter: "নিকটতম আশ্ৰয়",
    emergencyHelpline: "জৰুৰীকালীন হেল্পলাইন",
    reportHazard: "ভূস্খলন / বিপদৰ সংবাদ দিয়ক",
    iNeedRescue: "মোক উদ্ধাৰ কৰক",
    rescueSent: "উদ্ধাৰ অনুৰোধ পঠিওৱা হ'ল।",
    nearestRescueTeam: "নিকটতম উদ্ধাৰ দল",
    distance: "দূৰত্ব",
    eta: "আনুমানিক সময়",
    status: "স্থিতি",
    shelters: "ওচৰৰ আশ্ৰয়",
    capacity: "ক্ষমতা",
    contact: "যোগাযোগ",
    navigate: "নেভিগেট",
    description: "বিৱৰণ",
    hazardCategory: "বিপদ শ্ৰেণী",
    severity: "গুৰুত্ব",
    peopleAffected: "প্ৰভাৱিত লোক",
    location: "স্থান",
    submit: "সংবাদ দাখিল কৰক",
    reportSuccess: "সংবাদ সফলভাৱে দাখিল কৰা হ'ল।",
    demoData: "ডেমো ডাটা — ছিমুলেটেড প্ৰটটাইপ",
  },
  bn: {
    appName: "হিল কার্ড",
    tagline: "এআই ভিত্তিক পূর্ব সতর্কতা এবং ভূমিধস ঝুঁকি পর্যবেক্ষণ",
    currentLocation: "বর্তমান অবস্থান",
    currentRisk: "বর্তমান ঝুঁকি",
    riskProbability: "ঝুঁকি সম্ভাবনা",
    riskLevel: "ঝুঁকি স্তর",
    lastUpdated: "সর্বশেষ আপডেট",
    emergency: "জরুরী SOS",
    notifications: "বিজ্ঞপ্তি",
    voiceAlert: "ভয়েস অ্যালার্ট — ডেমো",
    voiceAlertMsg: "ভয়েস অ্যালার্ট — ডেমো ফিচার। নাগরিকের পছন্দের ভাষায় স্থানীয় ভয়েস অ্যালার্ট দেওয়া যেতে পারে।",
    warningTitle: "ভূমিধস ঝুঁকি সতর্কতা",
    warningReason: "ভারী বৃষ্টি + প্রতিকূল ভূখণ্ড + ঐতিহাসিক সংবেদনশীলতা।",
    recommendedAction: "প্রস্তাবিত পদক্ষেপ",
    nearestShelter: "নিকটতম আশ্রয়",
    emergencyHelpline: "জরুরী হেল্পলাইন",
    reportHazard: "ভূমিধস / বিপদের রিপোর্ট করুন",
    iNeedRescue: "আমার উদ্ধার দরকার",
    rescueSent: "উদ্ধার অনুরোধ পাঠানো হয়েছে।",
    nearestRescueTeam: "নিকটতম উদ্ধার দল",
    distance: "দূরত্ব",
    eta: "আনুমানিক সময়",
    status: "অবস্থা",
    shelters: "কাছাকাছি আশ্রয়",
    capacity: "ধারণক্ষমতা",
    contact: "যোগাযোগ",
    navigate: "নেভিগেট",
    description: "বিবরণ",
    hazardCategory: "বিপদ শ্রেণী",
    severity: "তীব্রতা",
    peopleAffected: "প্রভাবিত মানুষ",
    location: "অবস্থান",
    submit: "রিপোর্ট জমা দিন",
    reportSuccess: "রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে।",
    demoData: "ডেমো ডেটা — সিমুলেটেড প্রোটোটাইপ",
  },
  ne: {
    appName: "हिल कार्ड",
    tagline: "एआई आधारित शीघ्र चेतावनी र भूस्खलन जोखिम निगरानी",
    currentLocation: "हालको स्थान",
    currentRisk: "हालको जोखिम",
    riskProbability: "जोखिम सम्भावना",
    riskLevel: "जोखिम स्तर",
    lastUpdated: "अन्तिम अपडेट",
    emergency: "आपतकालीन SOS",
    notifications: "सूचनाहरू",
    voiceAlert: "भ्वाइस अलर्ट — डेमो",
    voiceAlertMsg: "भ्वाइस अलर्ट — डेमो विशेषता। नागरिकको मनपर्ने भाषामा स्थानीय भ्वाइस अलर्ट दिन सकिन्छ।",
    warningTitle: "भूस्खलन जोखिम अलर्ट",
    warningReason: "भारी वर्षा + प्रतिकूल भूभाग + ऐतिहासिक संवेदनशीलता।",
    recommendedAction: "सिफारिस गरिएको कार्य",
    nearestShelter: "नजिकको आश्रय",
    emergencyHelpline: "आपतकालीन हेल्पलाइन",
    reportHazard: "भूस्खलन / खतरा रिपोर्ट गर्नुहोस्",
    iNeedRescue: "मलाई उद्धार चाहिन्छ",
    rescueSent: "उद्धार अनुरोध पठाइयो।",
    nearestRescueTeam: "नजिकको उद्धार टोली",
    distance: "दूरी",
    eta: "अनुमानित समय",
    status: "स्थिति",
    shelters: "नजिकका आश्रयहरू",
    capacity: "क्षमता",
    contact: "सम्पर्क",
    navigate: "नेभिगेट",
    description: "विवरण",
    hazardCategory: "खतरा श्रेणी",
    severity: "गम्भीरता",
    peopleAffected: "प्रभावित मानिसहरू",
    location: "स्थान",
    submit: "रिपोर्ट पेश गर्नुहोस्",
    reportSuccess: "रिपोर्ट सफलतापूर्वक पेश गरियो।",
    demoData: "डेमो डेटा — सिमुलेटेड प्रोटोटाइप",
  },
};

export const riskColors: Record<RiskLevel, { bg: string; text: string; border: string; solid: string; badge: string }> = {
  LOW: { bg: "bg-green-50", text: "text-green-800", border: "border-green-200", solid: "bg-green-600", badge: "bg-green-100 text-green-800 border border-green-300" },
  MODERATE: { bg: "bg-yellow-50", text: "text-yellow-800", border: "border-yellow-200", solid: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-800 border border-yellow-300" },
  HIGH: { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-200", solid: "bg-orange-500", badge: "bg-orange-100 text-orange-800 border border-orange-300" },
  CRITICAL: { bg: "bg-red-50", text: "text-red-800", border: "border-red-200", solid: "bg-red-600", badge: "bg-red-100 text-red-800 border border-red-300" },
};
