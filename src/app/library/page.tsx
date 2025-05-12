// src/app/library/page.tsx
"use client";

import { books } from "@/data/books";
import Link from "next/link";
import { useState } from "react";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.writer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? book.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(books.map((b) => b.category)));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or writer"
          className="border border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg w-full md:w-1/2 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 focus:border-blue-500 px-4 py-2 rounded-lg w-full md:w-1/4 shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/library/${book.id}`}>
            <div className="relative bg-white shadow-md rounded-xl overflow-hidden group hover:shadow-xl transition duration-300">
              <div className="relative w-full h-72 flex items-center justify-center bg-gray-100">
                <img
                  src={book.image ?? `/pdf-thumbnails/${book.id}.jpg`}
                  alt={book.title ?? "PDF"}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold tracking-wide bg-black/50 px-3 py-1 rounded">
                    📖 Read
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-md text-gray-800 line-clamp-1">
                  {book.title ?? "Untitled Book"}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-1">
                  ✍️ {book.writer}
                </p>
                <p className="text-xs text-blue-500">{book.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
