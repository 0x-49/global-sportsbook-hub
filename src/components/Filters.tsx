import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

  const getCountryFlag = (countryCode: string) => {
    return countryCode ? `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png` : '';
  };

  const sortedCountries = [...availableCountries].sort((a, b) => a.name.localeCompare(b.name));

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
            {selectedCountry ? (
              <div className="flex items-center gap-2">
                {selectedCountry !== "all" && (
                  <img
                    src={getCountryFlag(selectedCountry)}
                    alt=""
                    className="w-4 h-4 object-contain"
                  />
                )}
                {availableCountries.find(c => c.code === selectedCountry)?.name || "All Countries"}
              </div>
            ) : (
              "Select Country..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full sm:w-[250px] p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              <CommandItem
                onSelect={() => {
                  onCountryFilter("all");
                  setOpen(false);
                }}
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
              {sortedCountries.map((country) => (
                <CommandItem
                  key={country.code}
                  onSelect={() => {
                    onCountryFilter(country.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCountry === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.code && (
                    <img
                      src={getCountryFlag(country.code)}
                      alt=""
                      className="w-4 h-4 object-contain"
                    />
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