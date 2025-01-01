import { Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sportsbook } from "@/types/sportsbook";

export const SportsbookCard = ({
  Name,
  Description,
  LogoIcon,
  estimatedMonthlyVisits,
  topCountries,
}: Sportsbook) => {
  // Get the latest month's visits
  const latestMonth = Object.keys(estimatedMonthlyVisits).sort().pop() || "";
  const monthlyVisits = estimatedMonthlyVisits[latestMonth];

  console.log(`Rendering sportsbook: ${Name}`);
  console.log(`Latest month: ${latestMonth}`);
  console.log(`Monthly visits: ${monthlyVisits}`);
  console.log(`Top countries:`, topCountries);

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
              {monthlyVisits.toLocaleString()}
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{Name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{Description}</p>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-gray-500">Top Countries</h4>
          {topCountries.map((country) => (
            <div
              key={country.countryCode}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Flag className="h-4 w-4" />
                <span className="text-sm">{country.countryName}</span>
              </div>
              <span className="text-sm font-medium">
                {(country.visitsShare * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};