import React from "react";
import { Filter, RotateCcw } from "lucide-react";

const stopsOptions = [
  { value: "any", label: "Any" },
  { value: "0", label: "Non-stop" },
  { value: "1", label: "1 Stop" },
  { value: "2", label: "2+ Stops" },
];

const departureTimeOptions = [
  { value: "any", label: "Any Time" },
  { value: "morning", label: "Morning (6AM - 12PM)" },
  { value: "afternoon", label: "Afternoon (12PM - 6PM)" },
  { value: "evening", label: "Evening (6PM - 12AM)" },
];

const defaultFilters = {
  maxPrice: 1500,
  stops: "any",
  departureTime: "any",
  airlines: [],
};

export default function FiltersPanel({
  filters = defaultFilters,
  onFilterChange,
  onResetFilters,
  availableAirlines = [],
}) {
  const handleChange = (key, value) => {
    if (onFilterChange) {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  const handleAirlineToggle = (airline) => {
    const currentAirlines = filters.airlines || [];
    const newAirlines = currentAirlines.includes(airline)
      ? currentAirlines.filter((a) => a !== airline)
      : [...currentAirlines, airline];
    handleChange("airlines", newAirlines);
  };

  const isFiltersActive =
    filters.maxPrice !== defaultFilters.maxPrice ||
    filters.stops !== defaultFilters.stops ||
    filters.departureTime !== defaultFilters.departureTime ||
    (filters.airlines && filters.airlines.length > 0);

  return (
    <aside className="lg:col-span-3 space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        {/* Header with Reset */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Filter size={18} className="text-blue-600" /> Filters
          </h3>
          {isFiltersActive && (
            <button
              onClick={onResetFilters}
              className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>

        {/* Max Price Slider */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-slate-500">
              Max Price
            </span>
            <span className="text-sm font-bold text-blue-600">
              ${filters.maxPrice?.toLocaleString() || "1,500"}
            </span>
          </div>
          <input
            type="range"
            min="200"
            max="3000"
            step="50"
            value={filters.maxPrice || 1500}
            onChange={(e) => handleChange("maxPrice", parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-400">$200</span>
            <span className="text-xs text-slate-400">$3,000</span>
          </div>
        </div>

        {/* Stops Filter */}
        <div className="mb-8">
          <span className="text-sm font-semibold text-slate-500 block mb-3">
            Stops
          </span>
          <div className="space-y-2">
            {stopsOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="stops"
                  value={option.value}
                  checked={filters.stops === option.value}
                  onChange={(e) => handleChange("stops", e.target.value)}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-800">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time Filter */}
        <div className="mb-8">
          <span className="text-sm font-semibold text-slate-500 block mb-3">
            Departure Time
          </span>
          <div className="space-y-2">
            {departureTimeOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="departureTime"
                  value={option.value}
                  checked={filters.departureTime === option.value}
                  onChange={(e) =>
                    handleChange("departureTime", e.target.value)
                  }
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-800">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines Filter */}
        {availableAirlines.length > 0 && (
          <div>
            <span className="text-sm font-semibold text-slate-500 block mb-3">
              Airlines
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableAirlines.map((airline) => (
                <label
                  key={airline}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.airlines?.includes(airline) || false}
                    onChange={() => handleAirlineToggle(airline)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800">
                    {airline}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
