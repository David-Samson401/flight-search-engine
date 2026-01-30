import React from "react";

// Single flight card skeleton
export function FlightCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Airline logo skeleton */}
        <div className="w-12 h-12 bg-slate-200 rounded-2xl"></div>

        {/* Flight info skeleton */}
        <div className="flex-1 flex items-center justify-between w-full">
          <div className="space-y-2">
            <div className="h-5 w-16 bg-slate-200 rounded"></div>
            <div className="h-3 w-10 bg-slate-100 rounded"></div>
          </div>

          <div className="flex-1 px-8">
            <div className="h-3 w-12 bg-slate-100 rounded mx-auto mb-2"></div>
            <div className="h-0.5 bg-slate-200 w-full rounded"></div>
            <div className="h-3 w-16 bg-slate-100 rounded mx-auto mt-2"></div>
          </div>

          <div className="text-right space-y-2">
            <div className="h-5 w-16 bg-slate-200 rounded ml-auto"></div>
            <div className="h-3 w-10 bg-slate-100 rounded ml-auto"></div>
          </div>
        </div>

        {/* Price skeleton */}
        <div className="border-l border-slate-100 pl-6 space-y-2">
          <div className="h-7 w-20 bg-slate-200 rounded"></div>
          <div className="h-3 w-14 bg-slate-100 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Multiple flight cards skeleton
export function FlightResultsSkeleton({ count = 5 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Price chart skeleton
export function ChartSkeleton() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse">
      <div className="h-5 w-40 bg-slate-200 rounded mb-4"></div>
      <div className="h-48 bg-slate-100 rounded-xl"></div>
    </div>
  );
}

// Search form skeleton
export function SearchFormSkeleton() {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 animate-pulse">
      <div className="flex gap-4 mb-6">
        <div className="h-10 w-28 bg-slate-200 rounded-full"></div>
        <div className="h-10 w-28 bg-slate-200 rounded-full"></div>
        <div className="h-10 w-28 bg-slate-200 rounded-full"></div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="h-14 bg-slate-200 rounded-xl"></div>
        <div className="h-14 bg-slate-200 rounded-xl"></div>
        <div className="h-14 bg-slate-200 rounded-xl"></div>
        <div className="h-14 bg-slate-200 rounded-xl"></div>
      </div>
    </div>
  );
}

export default FlightCardSkeleton;
