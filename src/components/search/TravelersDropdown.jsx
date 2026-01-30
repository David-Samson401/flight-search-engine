import React from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";

export default function TravelersDropdown({
  travelers,
  updateTravelers,
  getTotalTravelers,
}) {
  return (
    <div className="relative group">
      <span className="inline-flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-all font-medium text-slate-700">
        {getTotalTravelers()}
        <ChevronDown size={16} className="text-slate-400" />
      </span>
      {/* Dropdown Menu */}
      <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-4">
          <p className="text-xs font-bold text-slate-400 uppercase mb-4">
            Travelers
          </p>
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-700">Adults</p>
                <p className="text-xs text-slate-400">
                  Age 12+ Years at time of flight
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateTravelers("adults", -1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.adults <= 1}
                >
                  <Minus size={14} className="text-slate-600" />
                </button>
                <span className="w-6 text-center font-semibold text-slate-700">
                  {travelers.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updateTravelers("adults", 1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.adults >= 9}
                >
                  <Plus size={14} className="text-slate-600" />
                </button>
              </div>
            </div>
            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-700">Children</p>
                <p className="text-xs text-slate-400">
                  Age 2-11 Years at time of flight
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateTravelers("children", -1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.children <= 0}
                >
                  <Minus size={14} className="text-slate-600" />
                </button>
                <span className="w-6 text-center font-semibold text-slate-700">
                  {travelers.children}
                </span>
                <button
                  type="button"
                  onClick={() => updateTravelers("children", 1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.children >= 9}
                >
                  <Plus size={14} className="text-slate-600" />
                </button>
              </div>
            </div>
            {/* Infants */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-700">Infants</p>
                <p className="text-xs text-slate-400">
                  0-23 months at time of flight
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateTravelers("infants", -1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.infants <= 0}
                >
                  <Minus size={14} className="text-slate-600" />
                </button>
                <span className="w-6 text-center font-semibold text-slate-700">
                  {travelers.infants}
                </span>
                <button
                  type="button"
                  onClick={() => updateTravelers("infants", 1)}
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={travelers.infants >= 9}
                >
                  <Plus size={14} className="text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
