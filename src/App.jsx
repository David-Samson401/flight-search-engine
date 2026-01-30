import React, { useState } from "react";

// Components
import Header from "./components/layout/Header";
import SearchSection from "./components/search/SearchSection";
import PopularAirlines from "./components/search/PopularAirlines";
import FiltersPanel from "./components/filters/FiltersPanel";
import PriceTrendChart from "./components/charts/PriceTrendChart";
import FlightResults from "./components/results/FlightResults";

// Data
import { trendData, mockFlights } from "./data/mockData";

export default function App() {
  // Search state
  const [search, setSearch] = useState({
    origin: "",
    destination: "",
    date: "",
  });

  // Trip type state
  const [tripType, setTripType] = useState("Round Trip");

  // Travelers state
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // Cabin class state
  const [cabinClass, setCabinClass] = useState("Economy");

  // Helper to get total travelers count
  const getTotalTravelers = () => {
    const total = travelers.adults + travelers.children + travelers.infants;
    return total === 1 ? "1 Traveler" : `${total} Travelers`;
  };

  // Helper to update traveler count
  const updateTravelers = (type, increment) => {
    setTravelers((prev) => {
      const newValue = prev[type] + increment;
      const minValue = type === "adults" ? 1 : 0;
      if (newValue < minValue || newValue > 9) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  // Search action (will trigger API later)
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Triggering Search for:", search);
    alert(`Searching flights from ${search.origin} to ${search.destination}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6">
        <SearchSection
          search={search}
          setSearch={setSearch}
          tripType={tripType}
          setTripType={setTripType}
          travelers={travelers}
          updateTravelers={updateTravelers}
          getTotalTravelers={getTotalTravelers}
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
          onSearch={handleSearch}
        />

        <PopularAirlines />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FiltersPanel />

          <section className="lg:col-span-9 space-y-8">
            <PriceTrendChart data={trendData} />
            <FlightResults flights={mockFlights} />
          </section>
        </div>
      </main>
    </div>
  );
}
