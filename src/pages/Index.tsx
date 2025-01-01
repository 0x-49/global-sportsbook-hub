import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flag } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SportsbookCard } from "@/components/SportsbookCard";
import { Filters } from "@/components/Filters";
import { Sportsbook } from "@/types/sportsbook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const fetchSportsbooks = async (): Promise<Sportsbook[]> => {
  const response = await fetch("/sportsbooks.json");
  if (!response.ok) {
    throw new Error("Failed to fetch sportsbooks");
  }
  return response.json();
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"traffic" | "name">("traffic");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  const { data: sportsbooks = [], isLoading } = useQuery({
    queryKey: ["sportsbooks"],
    queryFn: fetchSportsbooks,
  });

  console.log("Fetched sportsbooks:", sportsbooks);

  const filteredSportsbooks = sportsbooks
    .filter((book) => {
      const matchesSearch = book.Name.toLowerCase().includes(
        searchQuery.toLowerCase()
      );
      const matchesCountry =
        selectedCountry === "all" ||
        book.topCountries.some((c) => c.countryCode === selectedCountry);
      return matchesSearch && matchesCountry;
    })
    .sort((a, b) => {
      if (sortBy === "traffic") {
        return (
          b.estimatedMonthlyVisits[
            Object.keys(b.estimatedMonthlyVisits)[0]
          ] -
          a.estimatedMonthlyVisits[
            Object.keys(a.estimatedMonthlyVisits)[0]
          ]
        );
      }
      return a.Name.localeCompare(b.Name);
    });

  // Get unique countries from all sportsbooks
  const uniqueCountries = Array.from(
    new Set(
      sportsbooks.flatMap((book) =>
        book.topCountries.map((country) => ({
          code: country.countryCode,
          name: country.countryName,
        }))
      )
    )
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onSearch={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <Select
            value={selectedCountry}
            onValueChange={(value) => setSelectedCountry(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {uniqueCountries.map(({ code, name }) => (
                <SelectItem key={code} value={code}>
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4" />
                    {name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value: "traffic" | "name") => setSortBy(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="traffic">Sort by Traffic</SelectItem>
              <SelectItem value="name">Sort by Name</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSportsbooks.map((sportsbook) => (
            <SportsbookCard key={sportsbook.Name} {...sportsbook} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;