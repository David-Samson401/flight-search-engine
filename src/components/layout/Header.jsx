import React from "react";
import { Plane } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Plane size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            SpotterFlights
          </h1>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
          Frontend Assessment
        </span>
      </div>
    </header>
  );
}
