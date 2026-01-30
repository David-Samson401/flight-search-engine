import React, { useState, useMemo, useRef } from "react";

// Components
import Header from "./components/layout/Header";
import SearchSection from "./components/search/SearchSection";
import PopularAirlines, {
  PopularAirlinesCompact,
} from "./components/search/PopularAirlines";
import FiltersPanel from "./components/filters/FiltersPanel";
import PriceTrendChart from "./components/charts/PriceTrendChart";
import FlightResults from "./components/results/FlightResults";
import { ToastContainer } from "./components/ui/Toast";
import { useToast } from "./hooks/useToast";

// Services
import { searchFlights, transformFlightOffer } from "./services/amadeus";

// Default filter values
const defaultFilters = {
  maxPrice: 1500,
  stops: "any",
  departureTime: "any",
  airlines: [],
};

export default function App() {
  // Toast notifications
  const { toasts, removeToast, success, error } = useToast();

  // Ref for scrolling to results
  const flightResultsRef = useRef(null);

  // Search state
  const [search, setSearch] = useState({
    origin: "",
    destination: "",
    date: "",
    returnDate: "",
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

  // Selected airline state (shared between compact and full versions)
  const [selectedAirline, setSelectedAirline] = useState(null);

  // Loading and search state
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [flights, setFlights] = useState([]);

  // Filter state
  const [filters, setFilters] = useState(defaultFilters);

  // Sort state
  const [sortBy, setSortBy] = useState("price-asc");

  // Get unique airlines from flights for filter
  const availableAirlines = useMemo(() => {
    const airlines = new Set(flights.map((f) => f.airline || f.airlineName));
    return Array.from(airlines).filter(Boolean);
  }, [flights]);

  // Generate graph data from flights
  const graphData = useMemo(() => {
    if (!flights || flights.length === 0) {
      // Return empty placeholder data to keep graph visible
      return [
        { name: "—", price: 0 },
        { name: "—", price: 0 },
        { name: "—", price: 0 },
        { name: "—", price: 0 },
        { name: "—", price: 0 },
        { name: "—", price: 0 },
        { name: "—", price: 0 },
      ];
    }

    // Map first 12 flights to graph format with explicit number conversion
    return flights.slice(0, 12).map((flight, index) => ({
      name: flight.airline || flight.airlineCode || `Flight ${index + 1}`,
      price: Number(parseFloat(flight.price)) || 0,
    }));
  }, [flights]);

  // Apply filters and sorting to flights
  const filteredAndSortedFlights = useMemo(() => {
    let result = [...flights];

    // Filter by max price
    result = result.filter((f) => f.price <= filters.maxPrice);

    // Filter by stops
    if (filters.stops !== "any") {
      result = result.filter((f) => {
        const stopCount =
          f.stops?.toLowerCase().includes("non-stop") ||
          f.stops?.toLowerCase().includes("direct")
            ? 0
            : parseInt(f.stops) || 1;
        if (filters.stops === "0") return stopCount === 0;
        if (filters.stops === "1") return stopCount === 1;
        if (filters.stops === "2") return stopCount >= 2;
        return true;
      });
    }

    // Filter by airlines (from filter panel)
    if (filters.airlines.length > 0) {
      result = result.filter((f) =>
        filters.airlines.includes(f.airline || f.airlineName),
      );
    }

    // Filter by selected airline (from airline pills)
    if (selectedAirline) {
      result = result.filter((f) =>
        (f.airline || f.airlineName)
          ?.toLowerCase()
          .includes(selectedAirline.toLowerCase()),
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "duration-asc":
          return (a.durationMinutes || 0) - (b.durationMinutes || 0);
        case "duration-desc":
          return (b.durationMinutes || 0) - (a.durationMinutes || 0);
        case "departure-asc":
          return a.departureTime?.localeCompare(b.departureTime);
        case "departure-desc":
          return b.departureTime?.localeCompare(a.departureTime);
        default:
          return 0;
      }
    });

    return result;
  }, [flights, filters, sortBy, selectedAirline]);

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

  // Handle airline selection
  const handleAirlineSelect = (airlineName) => {
    setSelectedAirline(airlineName);
    // Scroll to results when airline is selected
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Clear airline selection
  const handleClearSelection = () => {
    setSelectedAirline(null);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setSelectedAirline(null);
  };

  // Reset search
  const handleResetSearch = () => {
    setSearch({ origin: "", destination: "", date: "", returnDate: "" });
    setHasSearched(false);
    setFlights([]);
    setSearchError(null);
  };

  // Search action using Amadeus API
  const handleSearch = async (e) => {
    e.preventDefault();

    // Validation
    if (!search.origin || !search.destination) {
      error("Missing Information", "Please enter origin and destination.");
      return;
    }

    if (!search.date) {
      error("Missing Information", "Please select a departure date.");
      return;
    }

    setIsLoading(true);
    setSearchError(null);
    setHasSearched(true);
    setFlights([]);

    try {
      // Map cabin class to Amadeus format
      const travelClassMap = {
        Economy: "ECONOMY",
        "Premium Economy": "PREMIUM_ECONOMY",
        Business: "BUSINESS",
        First: "FIRST",
      };

      // Call Amadeus API
      const response = await searchFlights(
        search.origin,
        search.destination,
        search.date,
        {
          returnDate: tripType === "Round Trip" ? search.returnDate : undefined,
          adults: travelers.adults,
          children: travelers.children || undefined,
          infants: travelers.infants || undefined,
          travelClass: travelClassMap[cabinClass],
          max: 50,
        },
      );

      // Transform flight offers to app format
      const transformedFlights = response.data.map((offer) =>
        transformFlightOffer(offer, response.dictionaries),
      );

      setFlights(transformedFlights);

      if (transformedFlights.length > 0) {
        success(
          "Search Complete",
          `Found ${transformedFlights.length} flights from ${search.origin} to ${search.destination}`,
        );

        // Scroll to flight results after a short delay for state to update
        setTimeout(() => {
          flightResultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 300);
      } else {
        setSearchError("No flights found for your search criteria.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchError(
        err.message || "Failed to search for flights. Please try again.",
      );
      error(
        "Search Failed",
        err.message || "An error occurred while searching for flights.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Retry search after error
  const handleRetry = () => {
    handleSearch({ preventDefault: () => {} });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

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
          isLoading={isLoading}
        />

        {/* Compact airline filter - above results */}
        <PopularAirlinesCompact
          onAirlineSelect={handleAirlineSelect}
          selectedAirline={selectedAirline}
          onClearSelection={handleClearSelection}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <FiltersPanel
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            availableAirlines={availableAirlines}
          />

          <section className="lg:col-span-9 space-y-8">
            <PriceTrendChart data={graphData} />
            <div ref={flightResultsRef} className="scroll-mt-4">
              <FlightResults
                flights={filteredAndSortedFlights}
                isLoading={isLoading}
                hasSearched={hasSearched}
                error={searchError}
                searchQuery={search}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onReset={handleResetSearch}
                onRetry={handleRetry}
              />
            </div>
          </section>
        </div>

        {/* Full airline browser - bottom of page */}
        <PopularAirlines
          onAirlineSelect={handleAirlineSelect}
          selectedAirline={selectedAirline}
          onClearSelection={handleClearSelection}
        />
      </main>
    </div>
  );
}
