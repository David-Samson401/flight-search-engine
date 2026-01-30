import React from "react";
import { ChevronDown } from "lucide-react";

const CABIN_OPTIONS = ["Economy", "Premium", "Business Class", "First Class"];

export default function CabinClassDropdown({ cabinClass, setCabinClass }) {
  return (
    <div className="relative group">
      <span className="inline-flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all font-medium text-slate-700">
        {cabinClass}
        <ChevronDown size={16} className="text-slate-400" />
      </span>
      {/* Dropdown Menu */}
      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-3">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">
            Cabin Class
          </p>
          <div className="space-y-1">
            {CABIN_OPTIONS.map((cabin) => (
              <button
                key={cabin}
                type="button"
                onClick={() => setCabinClass(cabin)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  cabinClass === cabin
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                {cabin}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
