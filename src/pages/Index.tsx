import { useState } from "react";
import { Hero } from "@/components/Hero";
import { SportsbookCard } from "@/components/SportsbookCard";
import { Filters } from "@/components/Filters";

// Mock data - replace with real data later
const SPORTSBOOKS = [
  {
    id: 1,
    name: "BetMaster",
    rating: 4.8,
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop",
    description: "Leading sportsbook with competitive odds and extensive market coverage.",
    bonus: "Up to $1000 Welcome Bonus",
  },
  {
    id: 2,
    name: "SportKing",
    rating: 4.6,
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=50&h=50&fit=crop",
    description: "Premium betting experience with live streaming and instant payouts.",
    bonus: "$500 Risk-Free Bet",
  },
  {
    id: 3,
    name: "BetPro",
    rating: 4.7,
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=50&h=50&fit=crop",
    description: "Expert platform for professional bettors with advanced features.",
    bonus: "300% Deposit Match",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredSportsbooks = SPORTSBOOKS.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onSearch={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Filters onSortChange={setSortBy} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSportsbooks.map((sportsbook) => (
            <SportsbookCard key={sportsbook.id} {...sportsbook} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;