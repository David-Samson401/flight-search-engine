import React from "react";
import { Filter } from "lucide-react";

export default function FiltersPanel() {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
          <Filter size={18} className="text-blue-600" /> Filters
        </h3>
        {/* Max Price Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-slate-500">
              Max Price
            </span>
            <span className="text-sm font-bold text-blue-600">$1,500</span>
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
      </div>
    </aside>
  );
}
