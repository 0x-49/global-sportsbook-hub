import { Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Sportsbook } from "@/types/sportsbook";

// Function to convert country code to flag emoji
const getCountryFlag = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export const SportsbookCard = ({
  Name,
  Description,
  LogoIcon,
  estimatedMonthlyVisits,
  topCountries,
}: Sportsbook) => {
  console.log("SportsbookCard rendering with data:", {
    Name,
    estimatedMonthlyVisits,
    topCountries
  });

  // Safely get the latest month's visits with null checks
  const monthlyVisits = estimatedMonthlyVisits 
    ? Object.entries(estimatedMonthlyVisits)
        .sort(([a], [b]) => b.localeCompare(a))[0]?.[1] ?? 0
    : 0;

  console.log("Calculated monthly visits:", monthlyVisits);

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
          {(topCountries || []).map((country) => (
            <div
              key={country.countryCode}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl" role="img" aria-label={`Flag of ${country.countryName}`}>
                  {getCountryFlag(country.countryCode)}
                </span>
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