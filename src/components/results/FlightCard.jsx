import React from "react";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row items-center gap-6">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center justify-center">
        {flight.airline}
      </div>
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
          <p className="text-[10px] font-bold text-green-500 uppercase">
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
      <div className="text-right border-l border-slate-100 pl-6">
        <p className="text-2xl font-black">${flight.price}</p>
        <button className="text-xs font-bold text-blue-600 hover:underline">
          Details
        </button>
      </div>
    </div>
  );
}
