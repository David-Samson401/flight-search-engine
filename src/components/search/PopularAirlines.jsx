import React, { useState } from "react";

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

export default function PopularAirlines({ onAirlineSelect }) {
  const [selectedAirline, setSelectedAirline] = useState(null);

  const handleAirlineClick = (airline) => {
    setSelectedAirline(airline.name);
    if (onAirlineSelect) {
      onAirlineSelect(airline.name);
    }
  };

  return (
    <section className="w-full py-8">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
        {selectedAirline
          ? `${selectedAirline} - Available Flights`
          : "Most Popular Airlines"}
      </h2>

      <div className="flex flex-wrap justify-center gap-3">
        {airlines.map((airline) => (
          <button
            key={airline.name}
            onClick={() => handleAirlineClick(airline)}
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
            onClick={() => setSelectedAirline(null)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Clear selection
          </button>
        </div>
      )}
    </section>
  );
}
