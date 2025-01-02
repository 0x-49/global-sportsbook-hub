import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronDown, ChevronUp, FileText } from "lucide-react";
import * as flags from "country-flag-icons/react/3x2";

interface TransformedSportsbook {
  UniqueID: number;
  Name: string;
  Description: string;
  LogoIcon?: string;
  URL: string;
  descriptionsURL: string;
  estimatedMonthlyVisits: {
    [key: string]: number;
  };
  topCountries: Array<{
    countryCode: string;
    countryName: string;
    visitsShare: number;
  }>;
}

const formatTraffic = (visits: number) => {
  if (visits >= 1000000) {
    return `${(visits / 1000000).toFixed(1)}M`;
  } else if (visits >= 1000) {
    return `${(visits / 1000).toFixed(1)}K`;
  } else if (visits === 0) {
    return "0";
  }
  return visits.toString();
};

export const SportsbookCard = ({
  Name,
  Description,
  LogoIcon,
  URL,
  descriptionsURL,
  estimatedMonthlyVisits,
  topCountries,
}: TransformedSportsbook) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get the latest month's visits
  const monthlyVisits = estimatedMonthlyVisits 
    ? Object.entries(estimatedMonthlyVisits)
        .sort(([a], [b]) => b.localeCompare(a))[0]?.[1] ?? 0
    : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <img
            src={LogoIcon}
            alt={Name}
            className="h-12 w-auto object-contain"
          />
          <div className="text-right">
            <p className="text-sm text-gray-500">Monthly Visits</p>
            <p className="font-semibold">
              {formatTraffic(monthlyVisits)}
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{Name}</h3>
        <div className="mb-4">
          <p className={`text-gray-600 ${!isExpanded ? "line-clamp-3" : ""}`}>
            {Description}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 mt-1 flex items-center gap-1"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Read More <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>

        <div className="space-y-2 mb-6">
          <h4 className="font-semibold text-sm text-gray-500">Top Countries</h4>
          {(topCountries || []).map((country) => {
            const countryCode = country.countryCode?.toUpperCase();
            // @ts-ignore - Dynamic access to flag components
            const FlagComponent = countryCode && flags[countryCode] ? flags[countryCode] : null;

            return (
              <div
                key={country.countryName}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center gap-2">
                  {FlagComponent ? (
                    <FlagComponent 
                      className="w-5 h-auto rounded-sm" 
                      title={country.countryName}
                    />
                  ) : (
                    <span className="w-5 h-3.5 bg-gray-200 rounded flex items-center justify-center text-xs">
                      {country.countryName.slice(0, 2)}
                    </span>
                  )}
                  <span className="text-sm">{country.countryName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {(country.visitsShare * 100).toFixed(1)}%
                  </span>
                  {monthlyVisits && (
                    <span className="text-xs text-gray-500">
                      ({formatTraffic(monthlyVisits * country.visitsShare)})
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            onClick={() => window.open(URL, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Website
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => window.open(descriptionsURL, '_blank')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Read Analysis
          </Button>
        </div>
      </div>
    </Card>
  );
};