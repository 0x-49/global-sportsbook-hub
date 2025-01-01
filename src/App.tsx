import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Sonner } from "@/components/ui/sonner";
import { Hero } from "@/components/Hero";
import { Filters } from "@/components/Filters";
import { SportsbookCard } from "@/components/SportsbookCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Suspense, lazy, useState, useMemo } from 'react';
import { slugify } from '@/lib/utils';
import sportsbooks from '../public/sportsbooks.json';
import type { Sportsbook, Country } from '@/types/sportsbook';

// Lazy load components
const SportsbookDetails = lazy(() => import("@/pages/SportsbookDetails"));
const About = lazy(() => import("@/pages/About"));
const CountryPage = lazy(() => import("@/pages/CountryPage"));

const ITEMS_PER_PAGE = 6;
const queryClient = new QueryClient();

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("visits");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // Transform sportsbooks data to include proper country data
  const transformedSportsbooks = useMemo(() => {
    return (sportsbooks as any[]).map(sportsbook => ({
      ...sportsbook,
      topCountries: Array.from({ length: 5 }).map((_, i) => ({
        countryCode: sportsbook[`topCountries/${i}/countryCode`],
        countryName: sportsbook[`topCountries/${i}/countryName`],
        visitsShare: Number(sportsbook[`topCountries/${i}/visitsShare`]) || 0
      })).filter(country => country.countryName)
    }));
  }, []);

  // Get available countries
  const availableCountries = useMemo(() => {
    const countries = new Set<string>();
    transformedSportsbooks.forEach((sportsbook) => {
      sportsbook.topCountries.forEach(country => {
        if (country.countryName) {
          countries.add(country.countryName);
        }
      });
    });
    return Array.from(countries).sort().map(name => ({
      code: transformedSportsbooks.find(sb => 
        sb.topCountries.find(c => c.countryName === name)
      )?.topCountries.find(c => c.countryName === name)?.countryCode || '',
      name
    }));
  }, [transformedSportsbooks]);

  // Filter and sort sportsbooks
  const filteredSportsbooks = useMemo(() => {
    return transformedSportsbooks
      .filter((sportsbook) => {
        const matchesSearch = sportsbook.Name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = !selectedCountry || sportsbook.topCountries.some(
          country => country.countryName === selectedCountry
        );
        return matchesSearch && matchesCountry;
      })
      .sort((a, b) => {
        if (sortBy === "visits") {
          const aVisits = Number(a["estimatedMonthlyVisits/2024-11-01"]) || 0;
          const bVisits = Number(b["estimatedMonthlyVisits/2024-11-01"]) || 0;
          return bVisits - aVisits;
        }
        return a.Name.localeCompare(b.Name);
      });
  }, [searchQuery, sortBy, selectedCountry, transformedSportsbooks]);

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="min-h-screen">
                <Suspense fallback={
                  <div className="container mx-auto px-4 py-12">
                    <div className="animate-pulse space-y-4">
                      <div className="h-8 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                    </div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={
                      <div className="container mx-auto px-4 py-8">
                        <Hero onSearch={setSearchQuery} />
                        <Filters
                          onSortChange={setSortBy}
                          onCountryFilter={setSelectedCountry}
                          availableCountries={availableCountries}
                          selectedCountry={selectedCountry}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {filteredSportsbooks.slice(0, visibleItems).map((sportsbook) => (
                            <SportsbookCard 
                              key={sportsbook.UniqueID}
                              UniqueID={sportsbook.UniqueID}
                              Name={sportsbook.Name}
                              Description={sportsbook.Description}
                              LogoIcon={sportsbook.LogoIcon}
                              URL={sportsbook.URL}
                              descriptionsURL={`/sportsbook/${slugify(sportsbook.Name)}`}
                              estimatedMonthlyVisits={{
                                "2024-09-01": Number(sportsbook["estimatedMonthlyVisits/2024-09-01"]) || 0,
                                "2024-10-01": Number(sportsbook["estimatedMonthlyVisits/2024-10-01"]) || 0,
                                "2024-11-01": Number(sportsbook["estimatedMonthlyVisits/2024-11-01"]) || 0
                              }}
                              topCountries={sportsbook.topCountries}
                            />
                          ))}
                        </div>
                        {visibleItems < filteredSportsbooks.length && (
                          <div className="flex justify-center mt-8">
                            <Button onClick={handleLoadMore} size="lg">
                              Load More Sportsbooks
                            </Button>
                          </div>
                        )}
                      </div>
                    } />
                    <Route path="/sportsbook/:slug" element={<SportsbookDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/country/:code" element={<CountryPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
