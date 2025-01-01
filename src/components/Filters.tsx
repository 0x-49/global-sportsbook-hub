import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersProps {
  onSortChange: (value: "traffic" | "name") => void;
  onCountryFilter: (country: string) => void;
  availableCountries: Array<{ code: string; name: string }>;
  selectedCountry: string;
}

export const Filters = ({
  onSortChange,
  onCountryFilter,
  availableCountries,
  selectedCountry,
}: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex gap-4">
        <Button
          variant={selectedCountry === "" ? "default" : "outline"}
          onClick={() => onSortChange("traffic")}
        >
          Sort by Traffic
        </Button>
        <Button
          variant="outline"
          onClick={() => onSortChange("name")}
        >
          Sort by Name
        </Button>
      </div>
      
      <Select value={selectedCountry} onValueChange={onCountryFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All Countries</SelectItem>
            {availableCountries.map((country) => (
              <SelectItem key={country.code} value={country.code || "unknown"}>
                {country.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};