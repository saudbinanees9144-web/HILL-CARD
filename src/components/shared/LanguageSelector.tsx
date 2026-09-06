import { useApp, getRiskForLocation } from "@/store/AppContext";
import { languages } from "@/data/translations";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSelector() {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = languages.find((l) => l.code === language)!;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Globe size={16} />
        {current.nativeLabel}
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                l.code === language ? "font-bold text-blue-700 bg-blue-50" : "text-gray-700"
              }`}
            >
              {l.nativeLabel} <span className="text-gray-400">({l.label})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
