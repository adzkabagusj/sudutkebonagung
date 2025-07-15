"use client";

import { useState, useEffect } from "react";
import { Article } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";

// Definisikan tipe untuk props
interface ArticleListProps {
  initialArticles: Article[];
}

export default function ArticleList({ initialArticles }: ArticleListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("Semua");
  const [filteredArticles, setFilteredArticles] = useState(initialArticles);

  const tags = ["Semua", "Kegiatan Desa", "Budaya", "Wisata"];

  // useEffect untuk memfilter artikel setiap kali query pencarian atau tag berubah
  useEffect(() => {
    let articles = initialArticles;

    // Filter berdasarkan tag
    if (selectedTag !== "Semua") {
      articles = articles.filter((article) => article.tag === selectedTag);
    }

    // Filter berdasarkan judul
    if (searchQuery) {
      articles = articles.filter((article) =>
        article.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(articles);
  }, [searchQuery, selectedTag, initialArticles]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        {/* Search Bar */}
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Cari artikel berdasarkan judul..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-secondary"
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

        {/* Tag Filters */}
        <div className="flex-shrink-0 flex items-center gap-2 overflow-x-auto pb-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                selectedTag === tag
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="col-span-3 text-text_secondary text-center py-10">
            Tidak ada artikel yang cocok dengan kriteria pencarian Anda.
          </p>
        )}
      </div>
    </div>
  );
}
