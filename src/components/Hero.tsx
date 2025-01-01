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
            Compare the world's largest directory of sportsbooks in one place. Make informed decisions with real traffic data and comprehensive reviews.
          </p>

          {/* Key Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-4xl mx-auto text-white">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h3 className="font-semibold text-lg">Traffic Insights</h3>
              <p className="text-sm text-gray-300">Real-time data on monthly visits and user demographics</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h3 className="font-semibold text-lg">Global Coverage</h3>
              <p className="text-sm text-gray-300">Detailed analysis of sportsbooks from around the world</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <h3 className="font-semibold text-lg">Expert Reviews</h3>
              <p className="text-sm text-gray-300">Comprehensive evaluations and user experiences</p>
            </div>
          </div>

          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <Input
                className="w-full px-12 py-4 rounded-full text-lg shadow-lg"
                placeholder="Search sportsbooks by name or country..."
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <p className="mt-3 text-sm text-gray-300">
              Discover trusted sportsbooks with detailed traffic analytics and user insights
            </p>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]" />
    </div>
  );
};