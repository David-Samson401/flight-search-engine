import React from "react";
import { ChevronRight } from "lucide-react";

// Airline data array with display names and logo filenames
const airlines = [
  { name: "JetBlue", logo: "JetBlue" },
  { name: "American Airlines", logo: "American-Airline" },
  { name: "AirCanada", logo: "Air-Canada" },
  { name: "SouthWest", logo: "SouthWest" },
  { name: "British Airways", logo: "British-airways" },
  { name: "Porter", logo: "Porter" },
  { name: "Emirates", logo: "Emirates" },
  { name: "United Airlines", logo: "United-Airlines" },
  { name: "KLM", logo: "KLM" },
  { name: "Frontier", logo: "Frontier" },
  { name: "Qatar Airlines", logo: "Qatar" },
  { name: "Lufthansa", logo: "Lufthansa" },
  { name: "WestJet", logo: "WestJet" },
  { name: "Spirit", logo: "Spirit" },
  { name: "Turkish Airline", logo: "Turkish" },
  { name: "Alaska Airline", logo: "Alaska" },
  { name: "Air Transat", logo: "Transat" },
  { name: "Cathay", logo: "Cathay" },
  { name: "IndiGo", logo: "IndiGo" },
  { name: "Air India", logo: "AirIndia" },
  { name: "Copa", logo: "Copa" },
];

// Compact version - shows limited airlines with horizontal scroll
export function PopularAirlinesCompact({
  onAirlineSelect,
  selectedAirline,
  onClearSelection,
}) {
  const featuredAirlines = airlines.slice(0, 8); // Show first 8 airlines

  return (
    <section className="w-full py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          {selectedAirline
            ? `Filtering: ${selectedAirline}`
            : "Quick Filter by Airline"}
        </h3>
        {selectedAirline && (
          <button
            onClick={onClearSelection}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filter
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {featuredAirlines.map((airline) => (
          <button
            key={airline.name}
            onClick={() => onAirlineSelect(airline.name)}
            className={`flex items-center gap-2 px-3 py-1.5 bg-white border rounded-full hover:border-blue-400 hover:shadow-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
              selectedAirline === airline.name
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200"
            }`}
          >
            <img
              src={`/logos/${airline.logo}.webp`}
              alt={`${airline.name} logo`}
              className="h-5 object-contain"
            />
            <span className="text-xs font-medium text-gray-700">
              {airline.name}
            </span>
          </button>
        ))}
        <a
          href="#browse-airlines"
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 whitespace-nowrap"
        >
          More <ChevronRight size={14} />
        </a>
      </div>
    </section>
  );
}

// Full version - shows all airlines for discovery at bottom
export default function PopularAirlines({
  onAirlineSelect,
  selectedAirline,
  onClearSelection,
}) {
  return (
    <section
      id="browse-airlines"
      className="w-full py-10 mt-8 border-t border-gray-200"
    >
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Browse More Airlines
        </h2>
        <p className="text-sm text-gray-500">
          Discover flights from our partner airlines worldwide
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {airlines.map((airline) => (
          <button
            key={airline.name}
            onClick={() => onAirlineSelect(airline.name)}
            className={`flex items-center gap-2 px-4 py-2 bg-white border rounded-full hover:border-blue-400 hover:shadow-sm transition-all duration-200 cursor-pointer ${
              selectedAirline === airline.name
                ? "border-blue-500 ring-2 ring-blue-200"
                : "border-gray-200"
            }`}
          >
            <img
              src={`/logos/${airline.logo}.webp`}
              alt={`${airline.name} logo`}
              className="h-6 object-contain"
            />
            <span className="text-sm font-medium text-gray-700">
              {airline.name}
            </span>
          </button>
        ))}
      </div>

      {selectedAirline && (
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">
            Showing flight options for{" "}
            <span className="font-semibold text-blue-600">
              {selectedAirline}
            </span>
          </p>
          <button
            onClick={onClearSelection}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear selection
          </button>
        </div>
      )}
    </section>
  );
}
