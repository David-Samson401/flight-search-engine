import React, { useState } from "react";
import { ChevronDown, Clock, Luggage, Wifi, Coffee, Zap } from "lucide-react";

// Airline logo mapping (same as PopularAirlines)
const airlineLogos = {
  JetBlue: "JetBlue",
  "American Airlines": "American-Airline",
  AirCanada: "Air-Canada",
  SouthWest: "SouthWest",
  "British Airways": "British-airways",
  Porter: "Porter",
  Emirates: "Emirates",
  "United Airlines": "United-Airlines",
  KLM: "KLM",
  Frontier: "Frontier",
  "Qatar Airlines": "Qatar",
  Lufthansa: "Lufthansa",
  WestJet: "WestJet",
  Spirit: "Spirit",
  "Turkish Airline": "Turkish",
  "Alaska Airline": "Alaska",
  "Air Transat": "Transat",
  Cathay: "Cathay",
  IndiGo: "IndiGo",
  "Air India": "AirIndia",
  Copa: "Copa",
};

const getAirlineLogo = (airlineCode) => {
  // Try to match airline name or code
  const logoKey = Object.keys(airlineLogos).find(
    (key) =>
      key.toLowerCase().includes(airlineCode?.toLowerCase()) ||
      airlineCode?.toLowerCase().includes(key.toLowerCase()),
  );
  return logoKey ? `/logos/${airlineLogos[logoKey]}.webp` : null;
};

export default function FlightCard({ flight, isCheapest, isBestDeal }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const logoSrc = getAirlineLogo(flight.airline || flight.airlineName);

  return (
    <div
      className={`bg-white rounded-3xl border transition-all ${
        isBestDeal
          ? "border-green-300 ring-2 ring-green-100"
          : "border-slate-200 hover:border-blue-300"
      }`}
    >
      {/* Badges */}
      {(isCheapest || isBestDeal) && (
        <div className="flex gap-2 px-6 pt-4">
          {isCheapest && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
              <Zap size={12} /> Cheapest
            </span>
          )}
          {isBestDeal && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
              ★ Best Deal
            </span>
          )}
        </div>
      )}

      {/* Main Card Content */}
      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
        {/* Airline Logo */}
        <div className="w-12 h-12 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center justify-center overflow-hidden">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={flight.airline}
              className="w-10 h-10 object-contain"
            />
          ) : (
            <span className="text-xs font-bold">{flight.airline}</span>
          )}
        </div>

        {/* Flight Info */}
        <div className="flex-1 flex items-center justify-between w-full">
          <div>
            <p className="text-lg font-bold">{flight.departureTime}</p>
            <p className="text-xs text-slate-400 font-bold">{flight.origin}</p>
          </div>
          <div className="flex-1 px-8 text-center">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              {flight.duration}
            </p>
            <div className="h-0.5 bg-slate-100 w-full relative my-1">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400"></div>
            </div>
            <p
              className={`text-[10px] font-bold uppercase ${
                flight.stops === "Non-stop" || flight.stops === "Direct"
                  ? "text-green-500"
                  : "text-amber-500"
              }`}
            >
              {flight.stops}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{flight.arrivalTime}</p>
            <p className="text-xs text-slate-400 font-bold">
              {flight.destination}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="text-right border-l border-slate-100 pl-6 min-w-30">
          <p className="text-2xl font-black">${flight.price}</p>
          <p className="text-[10px] text-slate-400 font-medium">per person</p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-1 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
          >
            Details
            <ChevronDown
              size={14}
              className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-100 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flight Details */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                Flight Details
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock size={14} className="text-slate-400" />
                  <span>Duration: {flight.duration}</span>
                </div>
                <p className="text-sm text-slate-600">
                  Flight: {flight.flightNumber || "N/A"}
                </p>
                <p className="text-sm text-slate-600">
                  Aircraft: {flight.aircraft || "Boeing 737"}
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                Amenities
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                  <Wifi size={12} /> Wi-Fi
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                  <Coffee size={12} /> Meals
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                  <Luggage size={12} /> 1 Carry-on
                </span>
              </div>
            </div>

            {/* Booking */}
            <div className="flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">
                  Total Price
                </h4>
                <p className="text-xl font-bold text-slate-800">
                  ${flight.price}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    / person
                  </span>
                </p>
              </div>
              <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors">
                Select Flight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
