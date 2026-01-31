import React, { useState, useRef, useEffect } from "react";
import { Plane, MapPin } from "lucide-react";

// Popular airports database
const airports = [
  {
    code: "JFK",
    name: "John F. Kennedy International",
    city: "New York",
    country: "USA",
  },
  {
    code: "LAX",
    name: "Los Angeles International",
    city: "Los Angeles",
    country: "USA",
  },
  {
    code: "ORD",
    name: "O'Hare International",
    city: "Chicago",
    country: "USA",
  },
  {
    code: "ATL",
    name: "Hartsfield-Jackson Atlanta International",
    city: "Atlanta",
    country: "USA",
  },
  {
    code: "DFW",
    name: "Dallas/Fort Worth International",
    city: "Dallas",
    country: "USA",
  },
  { code: "DEN", name: "Denver International", city: "Denver", country: "USA" },
  {
    code: "SFO",
    name: "San Francisco International",
    city: "San Francisco",
    country: "USA",
  },
  {
    code: "SEA",
    name: "Seattle-Tacoma International",
    city: "Seattle",
    country: "USA",
  },
  {
    code: "LAS",
    name: "Harry Reid International",
    city: "Las Vegas",
    country: "USA",
  },
  {
    code: "MCO",
    name: "Orlando International",
    city: "Orlando",
    country: "USA",
  },
  { code: "MIA", name: "Miami International", city: "Miami", country: "USA" },
  {
    code: "BOS",
    name: "Boston Logan International",
    city: "Boston",
    country: "USA",
  },
  {
    code: "EWR",
    name: "Newark Liberty International",
    city: "Newark",
    country: "USA",
  },
  {
    code: "PHX",
    name: "Phoenix Sky Harbor International",
    city: "Phoenix",
    country: "USA",
  },
  {
    code: "IAH",
    name: "George Bush Intercontinental",
    city: "Houston",
    country: "USA",
  },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "UK" },
  { code: "LGW", name: "Gatwick Airport", city: "London", country: "UK" },
  {
    code: "CDG",
    name: "Charles de Gaulle Airport",
    city: "Paris",
    country: "France",
  },
  { code: "ORY", name: "Orly Airport", city: "Paris", country: "France" },
  {
    code: "FRA",
    name: "Frankfurt Airport",
    city: "Frankfurt",
    country: "Germany",
  },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  {
    code: "AMS",
    name: "Amsterdam Schiphol",
    city: "Amsterdam",
    country: "Netherlands",
  },
  {
    code: "MAD",
    name: "Adolfo Suárez Madrid–Barajas",
    city: "Madrid",
    country: "Spain",
  },
  {
    code: "BCN",
    name: "Barcelona–El Prat",
    city: "Barcelona",
    country: "Spain",
  },
  {
    code: "FCO",
    name: "Leonardo da Vinci–Fiumicino",
    city: "Rome",
    country: "Italy",
  },
  { code: "MXP", name: "Milan Malpensa", city: "Milan", country: "Italy" },
  {
    code: "ZRH",
    name: "Zurich Airport",
    city: "Zurich",
    country: "Switzerland",
  },
  {
    code: "VIE",
    name: "Vienna International",
    city: "Vienna",
    country: "Austria",
  },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "UAE" },
  {
    code: "AUH",
    name: "Abu Dhabi International",
    city: "Abu Dhabi",
    country: "UAE",
  },
  { code: "DOH", name: "Hamad International", city: "Doha", country: "Qatar" },
  {
    code: "SIN",
    name: "Singapore Changi",
    city: "Singapore",
    country: "Singapore",
  },
  {
    code: "HKG",
    name: "Hong Kong International",
    city: "Hong Kong",
    country: "China",
  },
  {
    code: "NRT",
    name: "Narita International",
    city: "Tokyo",
    country: "Japan",
  },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
  {
    code: "ICN",
    name: "Incheon International",
    city: "Seoul",
    country: "South Korea",
  },
  {
    code: "BKK",
    name: "Suvarnabhumi Airport",
    city: "Bangkok",
    country: "Thailand",
  },
  {
    code: "SYD",
    name: "Sydney Kingsford Smith",
    city: "Sydney",
    country: "Australia",
  },
  {
    code: "MEL",
    name: "Melbourne Airport",
    city: "Melbourne",
    country: "Australia",
  },
  {
    code: "YYZ",
    name: "Toronto Pearson International",
    city: "Toronto",
    country: "Canada",
  },
  {
    code: "YVR",
    name: "Vancouver International",
    city: "Vancouver",
    country: "Canada",
  },
  {
    code: "MEX",
    name: "Mexico City International",
    city: "Mexico City",
    country: "Mexico",
  },
  {
    code: "CUN",
    name: "Cancún International",
    city: "Cancún",
    country: "Mexico",
  },
  {
    code: "GRU",
    name: "São Paulo–Guarulhos",
    city: "São Paulo",
    country: "Brazil",
  },
  {
    code: "EZE",
    name: "Ministro Pistarini International",
    city: "Buenos Aires",
    country: "Argentina",
  },
  {
    code: "JNB",
    name: "O.R. Tambo International",
    city: "Johannesburg",
    country: "South Africa",
  },
  { code: "CAI", name: "Cairo International", city: "Cairo", country: "Egypt" },
  {
    code: "IST",
    name: "Istanbul Airport",
    city: "Istanbul",
    country: "Turkey",
  },
  {
    code: "DEL",
    name: "Indira Gandhi International",
    city: "Delhi",
    country: "India",
  },
  {
    code: "BOM",
    name: "Chhatrapati Shivaji Maharaj",
    city: "Mumbai",
    country: "India",
  },
  {
    code: "PEK",
    name: "Beijing Capital International",
    city: "Beijing",
    country: "China",
  },
  {
    code: "PVG",
    name: "Shanghai Pudong International",
    city: "Shanghai",
    country: "China",
  },
  {
    code: "KUL",
    name: "Kuala Lumpur International",
    city: "Kuala Lumpur",
    country: "Malaysia",
  },
  {
    code: "CPH",
    name: "Copenhagen Airport",
    city: "Copenhagen",
    country: "Denmark",
  },
  { code: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "Norway" },
  {
    code: "ARN",
    name: "Stockholm Arlanda",
    city: "Stockholm",
    country: "Sweden",
  },
  {
    code: "HEL",
    name: "Helsinki-Vantaa",
    city: "Helsinki",
    country: "Finland",
  },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
  { code: "LIS", name: "Lisbon Portela", city: "Lisbon", country: "Portugal" },
  {
    code: "ATH",
    name: "Athens International",
    city: "Athens",
    country: "Greece",
  },
  {
    code: "BRU",
    name: "Brussels Airport",
    city: "Brussels",
    country: "Belgium",
  },
];

export default function AirportInput({ value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Sync input value with prop
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Filter airports based on input
  const filteredAirports = airports
    .filter((airport) => {
      const searchTerm = inputValue.toLowerCase();
      return (
        airport.code.toLowerCase().includes(searchTerm) ||
        airport.name.toLowerCase().includes(searchTerm) ||
        airport.city.toLowerCase().includes(searchTerm) ||
        airport.country.toLowerCase().includes(searchTerm)
      );
    })
    .slice(0, 8); // Limit to 8 results

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(0);

    // Only update parent if it's a valid 3-letter code or empty
    if (newValue.length === 3 || newValue === "") {
      onChange(newValue);
    }
  };

  // Handle airport selection
  const handleSelect = (airport) => {
    setInputValue(airport.code);
    onChange(airport.code);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredAirports.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredAirports[highlightedIndex]) {
          handleSelect(filteredAirports[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
        // Reset to the actual value if input doesn't match a valid code
        if (inputValue.length !== 3) {
          setInputValue(value);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputValue, value]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const highlightedEl = dropdownRef.current.children[highlightedIndex];
      highlightedEl?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className="relative flex flex-col gap-1">
      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium uppercase"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />

      {/* Dropdown */}
      {isOpen && filteredAirports.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-72 overflow-y-auto"
        >
          {filteredAirports.map((airport, index) => (
            <button
              key={airport.code}
              type="button"
              className={`w-full px-3 py-2.5 flex items-start gap-3 text-left transition-colors ${
                index === highlightedIndex ? "bg-blue-50" : "hover:bg-slate-50"
              } ${index === 0 ? "rounded-t-xl" : ""} ${
                index === filteredAirports.length - 1 ? "rounded-b-xl" : ""
              }`}
              onClick={() => handleSelect(airport)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="flex-shrink-0 w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mt-0.5">
                <Plane size={16} className="text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">
                    {airport.code}
                  </span>
                  <span className="text-sm text-slate-500 truncate">
                    {airport.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin size={10} />
                  <span>
                    {airport.city}, {airport.country}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {isOpen && inputValue.length > 0 && filteredAirports.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 p-4 text-center text-slate-500 text-sm">
          No airports found for "{inputValue}"
        </div>
      )}
    </div>
  );
}
