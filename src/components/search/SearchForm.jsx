import React from "react";
import { Search, ArrowRightLeft, Loader2 } from "lucide-react";

export default function SearchForm({
  search,
  setSearch,
  onSearch,
  tripType,
  isLoading,
}) {
  const isRoundTrip = tripType === "Round Trip";

  const handleSwapLocations = () => {
    setSearch({
      ...search,
      origin: search.destination,
      destination: search.origin,
    });
  };

  return (
    <form onSubmit={onSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Origin */}
        <div className="md:col-span-3 flex flex-col gap-1">
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

        {/* Swap Button */}
        <div className="md:col-span-1 flex items-end justify-center pb-1">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
            title="Swap origin and destination"
          >
            <ArrowRightLeft size={18} />
          </button>
        </div>

        {/* Destination */}
        <div className="md:col-span-3 flex flex-col gap-1">
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

        {/* Departure Date */}
        <div
          className={`flex flex-col gap-1 ${isRoundTrip ? "md:col-span-2" : "md:col-span-4"}`}
        >
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
            {isRoundTrip ? "Departure" : "Date"}
          </label>
          <input
            type="date"
            className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            value={search.date}
            onChange={(e) => setSearch({ ...search, date: e.target.value })}
          />
        </div>

        {/* Return Date (only for Round Trip) */}
        {isRoundTrip && (
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
              Return
            </label>
            <input
              type="date"
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
              value={search.returnDate || ""}
              min={search.date}
              onChange={(e) =>
                setSearch({ ...search, returnDate: e.target.value })
              }
            />
          </div>
        )}

        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[50px] bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-200/50 flex items-center justify-center"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Search size={20} />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
