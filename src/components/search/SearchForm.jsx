import React from "react";
import { Search } from "lucide-react";

export default function SearchForm({ search, setSearch, onSearch }) {
  return (
    <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <Search size={18} /> Search Flight
        </button>
      </div>
    </form>
  );
}
