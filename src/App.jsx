import React, { useState } from "react";
import {
  Search,
  Filter,
  Plane,
  BarChart3,
  LayoutGrid,
  Clock,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// 1. MOCK DATA (We use this until the API is connected)
const trendData = [
  { date: "Mar 01", price: 450 },
  { date: "Mar 02", price: 420 },
  { date: "Mar 03", price: 580 },
  { date: "Mar 04", price: 490 },
  { date: "Mar 05", price: 450 },
  { date: "Mar 06", price: 400 },
  { date: "Mar 07", price: 520 },
];

export default function App() {
  // 2. STATE: This tracks what the user types
  const [search, setSearch] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  // 3. ACTION: This will eventually trigger the Amadeus API
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Triggering Search for:", search);
    alert(`Searching flights from ${search.origin} to ${search.destination}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* HEADER */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* SEARCH SECTION */}
        <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Origin
              </label>
              <input
                type="text"
                placeholder="e.g. JFK"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium uppercase"
                value={search.origin}
                onChange={(e) =>
                  setSearch({ ...search, origin: e.target.value.toUpperCase() })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Destination
              </label>
              <input
                type="text"
                placeholder="e.g. LHR"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium uppercase"
                value={search.destination}
                onChange={(e) =>
                  setSearch({
                    ...search,
                    destination: e.target.value.toUpperCase(),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
                Date
              </label>
              <input
                type="date"
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                value={search.date}
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex justify-center items-center gap-2"
              >
                <Search size={18} /> Search
              </button>
            </div>
          </form>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: FILTERS */}
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
                  <span className="text-sm font-bold text-blue-600">
                    $1,500
                  </span>
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

          {/* RIGHT: GRAPH & RESULTS */}
          <section className="lg:col-span-9 space-y-8">
            {/* THE PRICE GRAPH */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-slate-700 mb-6 flex items-center gap-2">
                <BarChart3 size={18} className="text-blue-600" /> Price Trend
              </h3>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "16px",
                        border: "none",
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#2563eb",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* FLIGHT CARDS */}
            <div className="space-y-4">
              <h3 className="font-bold text-slate-700 flex items-center gap-2">
                <LayoutGrid size={18} className="text-blue-600" /> Available
                Flights
              </h3>
              {/* Result Card Example */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col md:flex-row items-center gap-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center justify-center">
                  AA
                </div>
                <div className="flex-1 flex items-center justify-between w-full">
                  <div>
                    <p className="text-lg font-bold">10:00 AM</p>
                    <p className="text-xs text-slate-400 font-bold">JFK</p>
                  </div>
                  <div className="flex-1 px-8 text-center">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      6h 20m
                    </p>
                    <div className="h-[2px] bg-slate-100 w-full relative my-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400"></div>
                    </div>
                    <p className="text-[10px] font-bold text-green-500 uppercase">
                      Non-stop
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">4:20 PM</p>
                    <p className="text-xs text-slate-400 font-bold">LHR</p>
                  </div>
                </div>
                <div className="text-right border-l border-slate-100 pl-6">
                  <p className="text-2xl font-black">$640</p>
                  <button className="text-xs font-bold text-blue-600 hover:underline">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
