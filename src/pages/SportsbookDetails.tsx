import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import sportsbooks from "../../public/sportsbooks.json";
import { slugify } from "@/lib/utils";
import { useMemo } from "react";
import { LineChart } from "@/components/LineChart";
import { PieChart } from "@/components/PieChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SportsbookDetails() {
  const { slug } = useParams();

  const sportsbook = useMemo(() => {
    return sportsbooks.find(s => slugify(s.Name) === slug);
  }, [slug]);

  const { data: description, isLoading, error } = useQuery({
    queryKey: ["sportsbook-description", sportsbook?.UniqueID],
    queryFn: async () => {
      if (!sportsbook?.UniqueID) return null;
      try {
        const response = await fetch(`/descriptions/${sportsbook.UniqueID}.md`);
        if (!response.ok) throw new Error('Failed to fetch description');
        const text = await response.text();
        return marked(text);
      } catch (error) {
        console.error('Error fetching description:', error);
        return marked(sportsbook.Description || '');
      }
    },
    enabled: !!sportsbook
  });

  if (!sportsbook) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Sportsbook not found</h1>
        </Card>
      </div>
    );
  }

  if (isLoading) {
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

  const latestTraffic = Number(sportsbook["estimatedMonthlyVisits/2024-11-01"]) || 0;
  
  // Prepare traffic data for the line chart
  const trafficData = [
    {
      date: "Sep 2024",
      visits: Number(sportsbook["estimatedMonthlyVisits/2024-09-01"]) || 0
    },
    {
      date: "Oct 2024",
      visits: Number(sportsbook["estimatedMonthlyVisits/2024-10-01"]) || 0
    },
    {
      date: "Nov 2024",
      visits: latestTraffic
    }
  ];

  // Prepare top countries data for the pie chart
  const topCountriesData = Array.from({ length: 5 }, (_, i) => ({
    country: sportsbook[`topCountries/${i}/countryName`] as string,
    share: Number(sportsbook[`topCountries/${i}/visitsShare`]) || 0
  })).filter(country => country.country && country.share > 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            {sportsbook.LogoIcon && (
              <img 
                src={sportsbook.LogoIcon} 
                alt={`${sportsbook.Name} logo`}
                className="w-20 h-20 object-contain rounded-lg shadow-sm"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{sportsbook.Name}</h1>
              <p className="text-muted-foreground text-lg">
                Monthly Visits: {latestTraffic.toLocaleString()}
              </p>
            </div>
            {sportsbook.URL && (
              <a
                href={sportsbook.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors text-lg font-semibold"
              >
                Visit Website
              </a>
            )}
          </div>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar with Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Traffic Insights</h2>
              <div className="h-[300px]">
                <LineChart
                  data={trafficData}
                  xKey="date"
                  yKey="visits"
                  title="Monthly Visits"
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Countries</h2>
              <div className="h-[300px]">
                <PieChart
                  data={topCountriesData}
                  nameKey="country"
                  valueKey="share"
                />
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Full Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="prose dark:prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: description?.split('\n').slice(0, 5).join('\n') || sportsbook.Description 
                    }} />
                  </div>
                </TabsContent>

                <TabsContent value="details">
                  <ScrollArea className="h-[800px] pr-4">
                    <div className="prose dark:prose-invert max-w-none">
                      <div dangerouslySetInnerHTML={{ 
                        __html: description || sportsbook.Description 
                      }} />
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
