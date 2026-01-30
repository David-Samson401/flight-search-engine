import React from "react";
import TripTypeDropdown from "./TripTypeDropdown";
import TravelersDropdown from "./TravelersDropdown";
import CabinClassDropdown from "./CabinClassDropdown";
import SearchForm from "./SearchForm";

export default function SearchSection({
  search,
  setSearch,
  tripType,
  setTripType,
  travelers,
  updateTravelers,
  getTotalTravelers,
  cabinClass,
  setCabinClass,
  onSearch,
}) {
  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
      {/* DROPDOWN SPANS ROW */}
      <div className="flex flex-wrap gap-4 mb-6">
        <TripTypeDropdown tripType={tripType} setTripType={setTripType} />
        <TravelersDropdown
          travelers={travelers}
          updateTravelers={updateTravelers}
          getTotalTravelers={getTotalTravelers}
        />
        <CabinClassDropdown
          cabinClass={cabinClass}
          setCabinClass={setCabinClass}
        />
      </div>

      <SearchForm search={search} setSearch={setSearch} onSearch={onSearch} />
    </section>
  );
}
