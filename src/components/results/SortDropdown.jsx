import React, { useState } from "react";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";

const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "duration-asc", label: "Duration: Shortest" },
  { value: "duration-desc", label: "Duration: Longest" },
  { value: "departure-asc", label: "Departure: Earliest" },
  { value: "departure-desc", label: "Departure: Latest" },
];

export default function SortDropdown({ sortBy, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption =
    sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
      >
        <ArrowUpDown size={16} className="text-slate-500" />
        <span className="text-sm font-medium text-slate-700">
          {currentOption.label}
        </span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-20">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                  sortBy === option.value
                    ? "text-blue-600 font-medium"
                    : "text-slate-700"
                }`}
              >
                {option.label}
                {sortBy === option.value && (
                  <Check size={16} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
