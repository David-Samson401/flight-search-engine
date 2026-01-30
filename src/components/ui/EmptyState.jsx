import React from "react";
import { Search, Plane, AlertCircle, RefreshCw } from "lucide-react";

// Initial state - before any search
export function InitialSearchState() {
  return (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Search size={36} className="text-blue-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Search for Flights
      </h3>
      <p className="text-slate-500 max-w-md mx-auto">
        Enter your origin, destination, and travel dates above to find the best
        flight deals from our partner airlines.
      </p>
    </div>
  );
}

// No results found
export function NoResultsState({ searchQuery, onReset }) {
  return (
    <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Plane size={36} className="text-amber-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        No Flights Found
      </h3>
      <p className="text-slate-500 max-w-md mx-auto mb-6">
        We couldn't find any flights
        {searchQuery?.origin && searchQuery?.destination
          ? ` from ${searchQuery.origin} to ${searchQuery.destination}`
          : ""}{" "}
        for your selected dates. Try adjusting your search criteria.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
      >
        <RefreshCw size={18} />
        Modify Search
      </button>
    </div>
  );
}

// Error state
export function ErrorState({ message, onRetry }) {
  return (
    <div className="bg-white p-12 rounded-3xl border border-red-100 text-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle size={36} className="text-red-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Something Went Wrong
      </h3>
      <p className="text-slate-500 max-w-md mx-auto mb-6">
        {message ||
          "We encountered an error while searching for flights. Please try again."}
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
      >
        <RefreshCw size={18} />
        Try Again
      </button>
    </div>
  );
}

export default InitialSearchState;
