import React from "react";
import { LayoutGrid, Plane } from "lucide-react";
import FlightCard from "./FlightCard";
import SortDropdown from "./SortDropdown";
import { FlightResultsSkeleton } from "../ui/LoadingSkeleton";
import {
  InitialSearchState,
  NoResultsState,
  ErrorState,
} from "../ui/EmptyState";

export default function FlightResults({
  flights,
  isLoading,
  hasSearched,
  error,
  searchQuery,
  sortBy,
  onSortChange,
  onReset,
  onRetry,
}) {
  // Find cheapest flight for badge
  const cheapestPrice = flights?.length
    ? Math.min(...flights.map((f) => f.price))
    : null;

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-700 flex items-center gap-2">
            <Plane size={18} className="text-blue-600 animate-pulse" />
            Searching flights...
          </h3>
        </div>
        <FlightResultsSkeleton count={4} />
      </div>
    );
  }

  // Error state
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  // Initial state - before search
  if (!hasSearched) {
    return <InitialSearchState />;
  }

  // No results
  if (!flights || flights.length === 0) {
    return <NoResultsState searchQuery={searchQuery} onReset={onReset} />;
  }

  // Results found
  return (
    <div className="space-y-4">
      {/* Header with count and sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-bold text-slate-700 flex items-center gap-2">
          <LayoutGrid size={18} className="text-blue-600" />
          <span>Available Flights</span>
          <span className="text-sm font-normal text-slate-400">
            ({flights.length} {flights.length === 1 ? "result" : "results"})
          </span>
        </h3>
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
      </div>

      {/* Flight Cards */}
      {flights.map((flight, index) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          isCheapest={flight.price === cheapestPrice}
          isBestDeal={index === 0 && flight.price === cheapestPrice}
        />
      ))}
    </div>
  );
}
