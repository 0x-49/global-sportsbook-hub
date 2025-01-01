import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Country {
  code: string;
  name: string;
}

const availableCountries: Country[] = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "BR", name: "Brazil" },
  { code: "JP", name: "Japan" },
];

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
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`;
  };

  const CountryFlag = ({ code }: { code: string }) => {
    const [imgError, setImgError] = useState(false);
    
    if (!code || imgError) {
      return (
        <span className="w-4 h-4 bg-gray-200 rounded flex items-center justify-center text-xs">
          {code?.slice(0, 2)}
        </span>
      );
    }

    return (
      <img
        src={getFlagUrl(code)}
        alt={`${code} flag`}
        className="w-4 h-4 rounded"
        onError={() => setImgError(true)}
      />
    );
  };

  const handleCountrySelect = (country: string) => {
    onCountryFilter(country);
    setOpen(false);
    if (country === "all") {
      navigate("/");
    } else {
      navigate(`/country/${country.toLowerCase()}`);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex gap-2">
        <Button
          variant={selectedCountry === "" ? "default" : "outline"}
          onClick={() => onSortChange("traffic")}
          className="flex-1 sm:flex-none"
        >
          Sort by Traffic
        </Button>
        <Button
          variant="outline"
          onClick={() => onSortChange("name")}
          className="flex-1 sm:flex-none"
        >
          Sort by Name
        </Button>
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full sm:w-[250px] justify-between"
          >
            <div className="flex items-center gap-2">
              {selectedCountry !== "all" && (
                <CountryFlag code={selectedCountry} />
              )}
              <span>
                {selectedCountry === "all"
                  ? "All Countries"
                  : availableCountries.find(c => c.code === selectedCountry)?.name || "Select Country"}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              <CommandItem
                key="all"
                value="all"
                onSelect={() => handleCountrySelect("all")}
                className="flex items-center gap-2"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedCountry === "all" ? "opacity-100" : "opacity-0"
                  )}
                />
                All Countries
              </CommandItem>
              {availableCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={() => handleCountrySelect(country.code)}
                  className="flex items-center gap-2"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.code && (
                    <CountryFlag code={country.code} />
                  )}
                  {country.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
