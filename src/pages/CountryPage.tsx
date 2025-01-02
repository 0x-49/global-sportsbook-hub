import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import { Card } from "@/components/ui/card";
import { SportsbookCard } from "@/components/SportsbookCard";
import { Sportsbook } from "@/types/sportsbook";
import { slugify } from "@/lib/utils";

// Import the JSON directly
import sportsbooksData from "../../public/sportsbooks.json";

export default function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const sportsbooks = sportsbooksData as Sportsbook[];

  const { data: countryContent, isLoading: isContentLoading } = useQuery({
    queryKey: ["country-content", code],
    queryFn: async () => {
      if (!code) return null;
      try {
        const response = await fetch(`/countries/${code.toLowerCase()}.md`);
        if (!response.ok) throw new Error('Failed to fetch country content');
        const text = await response.text();
        return marked(text);
      } catch (error) {
        console.error('Error fetching country content:', error);
        return null;
      }
    },
    enabled: !!code
  });

  // Get sportsbooks for this country
  const countrySportsbooks = sportsbooks.filter(sportsbook => 
    sportsbook.topCountries?.some(country => 
      country.countryCode.toLowerCase() === code?.toLowerCase()
    )
  ).sort((a, b) => {
    const aTraffic = Number(a["estimatedMonthlyVisits/2024-11-01"]) || 0;
    const bTraffic = Number(b["estimatedMonthlyVisits/2024-11-01"]) || 0;
    return bTraffic - aTraffic;
  });

  const countryName = countrySportsbooks[0]?.topCountries?.find(
    c => c.countryCode.toLowerCase() === code?.toLowerCase()
  )?.countryName || code;

  if (!code) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
        </Card>
      </div>
    );
  }

  if (isContentLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4">
            <img
              src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
              alt={`${countryName} flag`}
              className="w-16 h-auto"
            />
            <div>
              <h1 className="text-3xl font-bold">Top Sportsbooks in {countryName}</h1>
              <p className="text-muted-foreground">
                Showing {countrySportsbooks.length} sportsbooks available in {countryName}
              </p>
            </div>
          </div>
        </Card>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div 
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: countryContent || '' }}
              />
            </Card>
          </div>

          {/* Sportsbook Cards */}
          <div className="lg:col-span-1 space-y-6">
            {countrySportsbooks.slice(0, 5).map((sportsbook) => (
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
        </div>
      </div>
    </div>
  );
}
