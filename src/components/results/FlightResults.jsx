import React from "react";
import { LayoutGrid } from "lucide-react";
import FlightCard from "./FlightCard";

export default function FlightResults({ flights }) {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-slate-700 flex items-center gap-2">
        <LayoutGrid size={18} className="text-blue-600" /> Available Flights
      </h3>
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
