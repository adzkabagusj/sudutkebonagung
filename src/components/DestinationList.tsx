"use client";

import { useState, useEffect } from "react";
import { Destination } from "@/lib/api";
import DestinationCard from "@/components/DestinationCard";

// Definisikan tipe untuk props
interface DestinationListProps {
  initialDestinations: Destination[];
}

export default function DestinationList({
  initialDestinations,
}: DestinationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDestinations, setFilteredDestinations] =
    useState(initialDestinations);

  // useEffect untuk memfilter destinasi setiap kali query pencarian berubah
  useEffect(() => {
    const destinations = initialDestinations.filter((destination) =>
      destination.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDestinations(destinations);
  }, [searchQuery, initialDestinations]);

  return (
    <div>
      {/* Search Bar */}
      <div className="relative mb-12 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Cari destinasi wisata..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <p className="col-span-full text-text_secondary text-center py-10">
            Destinasi yang Anda cari tidak ditemukan.
          </p>
        )}
      </div>
    </div>
  );
}
