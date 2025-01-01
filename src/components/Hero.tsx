import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  onSearch: (query: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  return (
    <div className="relative bg-primary py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            Find Your Perfect Sportsbook
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Compare the world's largest directory of sportsbooks in one place
          </p>
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Input
                className="w-full px-12 py-4 rounded-full text-lg"
                placeholder="Search sportsbooks..."
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};