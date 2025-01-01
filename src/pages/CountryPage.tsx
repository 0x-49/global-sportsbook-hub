import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SportsbookCard } from "@/components/SportsbookCard";
import sportsbooks from "../../public/sportsbooks.json";
import { useMemo } from "react";
import { slugify } from "@/lib/utils";
import type { Sportsbook } from "@/types/sportsbook";
import * as flags from "country-flag-icons/react/3x2";

export default function CountryPage() {
  const { code } = useParams();

  const countryData = useMemo(() => {
    const transformedSportsbooks = (sportsbooks as any[]).map(sportsbook => ({
      ...sportsbook,
      topCountries: Array.from({ length: 5 }).map((_, i) => ({
        countryCode: sportsbook[`topCountries/${i}/countryCode`],
        countryName: sportsbook[`topCountries/${i}/countryName`],
        visitsShare: Number(sportsbook[`topCountries/${i}/visitsShare`]) || 0
      })).filter(country => country.countryName)
    }));

    const countryName = transformedSportsbooks.find(sb => 
      sb.topCountries.find(c => c.countryCode?.toLowerCase() === code?.toLowerCase())
    )?.topCountries.find(c => c.countryCode?.toLowerCase() === code?.toLowerCase())?.countryName;

    const sportsbooksInCountry = transformedSportsbooks
      .filter(sportsbook => 
        sportsbook.topCountries.some(c => c.countryCode?.toLowerCase() === code?.toLowerCase())
      )
      .sort((a, b) => {
        const aShare = a.topCountries.find(c => c.countryCode?.toLowerCase() === code?.toLowerCase())?.visitsShare || 0;
        const bShare = b.topCountries.find(c => c.countryCode?.toLowerCase() === code?.toLowerCase())?.visitsShare || 0;
        return bShare - aShare;
      });

    return {
      countryName,
      sportsbooks: sportsbooksInCountry
    };
  }, [code]);

  if (!countryData.countryName) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Country not found</h1>
          <p className="text-muted-foreground">The country you're looking for doesn't exist in our database.</p>
        </Card>
      </div>
    );
  }

  // @ts-ignore - Dynamic access to flag components
  const FlagComponent = code && flags[code.toUpperCase()];

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="p-6 mb-8">
        <div className="flex items-center gap-4 mb-4">
          {FlagComponent && <FlagComponent className="w-12 h-8" />}
          <h1 className="text-3xl font-bold">Top Sportsbooks in {countryData.countryName}</h1>
        </div>
        <p className="text-muted-foreground">
          Discover the most popular sportsbooks used by players in {countryData.countryName}.
          These rankings are based on actual traffic data and user preferences.
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countryData.sportsbooks.map((sportsbook) => (
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
  );
}
