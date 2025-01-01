import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import sportsbooks from "../../public/sportsbooks.json";
import { slugify } from "@/lib/utils";
import { useMemo } from "react";

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            {sportsbook.LogoIcon && (
              <img 
                src={sportsbook.LogoIcon} 
                alt={`${sportsbook.Name} logo`}
                className="w-16 h-16 object-contain"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold">{sportsbook.Name}</h1>
              <p className="text-muted-foreground">
                Monthly Visits: {latestTraffic.toLocaleString()}
              </p>
            </div>
          </div>
          {sportsbook.URL && (
            <a
              href={sportsbook.URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors mb-6"
            >
              Visit Website
            </a>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">About {sportsbook.Name}</h2>
          {error ? (
            <div className="prose dark:prose-invert">
              <p>{sportsbook.Description}</p>
            </div>
          ) : (
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: description || sportsbook.Description }}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
