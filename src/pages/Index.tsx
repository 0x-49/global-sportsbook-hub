import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SportsbookCard } from "@/components/SportsbookCard";
import { Filters } from "@/components/Filters";
import { Sportsbook } from "@/types/sportsbook";

const fetchSportsbooks = async (): Promise<Sportsbook[]> => {
  console.log("Fetching sportsbooks...");
  const response = await fetch("/sportsbooks.json");
  if (!response.ok) {
    throw new Error("Failed to fetch sportsbooks");
  }
  const data = await response.json();
  console.log("Fetched sportsbooks:", data);
  return data;
};

const Index = () => {
  const [sortBy, setSortBy] = useState<"traffic" | "name">("traffic");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const { data: sportsbooks, isLoading, error } = useQuery({
    queryKey: ["sportsbooks"],
    queryFn: fetchSportsbooks,
  });

  console.log("Current sportsbooks data:", sportsbooks);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  // Get available countries from sportsbooks
  const availableCountries = sportsbooks?.flatMap(sb => 
    sb.topCountries?.map(tc => ({
      code: tc.countryCode,
      name: tc.countryName
    })) || []
  ).filter((country, index, self) => 
    index === self.findIndex(c => c.code === country.code)
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error loading sportsbooks: {error.message}
      </div>
    );
  }

  const sortedSportsbooks = [...(sportsbooks || [])].sort((a, b) => {
    if (sortBy === "traffic") {
      return (
        (b["estimatedMonthlyVisits/2024-11-01"] || 0) -
        (a["estimatedMonthlyVisits/2024-11-01"] || 0)
      );
    }
    return a.Name.localeCompare(b.Name);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Filters 
          onSortChange={setSortBy} 
          onCountryFilter={setSelectedCountry}
          availableCountries={availableCountries}
          selectedCountry={selectedCountry}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSportsbooks.map((sportsbook) => (
            <SportsbookCard 
              key={sportsbook.UniqueID}
              UniqueID={sportsbook.UniqueID}
              Name={sportsbook.Name}
              Description={sportsbook.Description}
              LogoIcon={sportsbook.LogoIcon}
              URL={sportsbook.URL}
              descriptionsURL={sportsbook["Descriptions Object URL"]}
              estimatedMonthlyVisits={{
                "2024-09-01": sportsbook["estimatedMonthlyVisits/2024-09-01"],
                "2024-10-01": sportsbook["estimatedMonthlyVisits/2024-10-01"],
                "2024-11-01": sportsbook["estimatedMonthlyVisits/2024-11-01"]
              }}
              topCountries={sportsbook.topCountries || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;