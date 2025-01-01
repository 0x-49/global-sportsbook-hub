import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SportsbookProps {
  name: string;
  rating: number;
  logo: string;
  description: string;
  bonus: string;
}

export const SportsbookCard = ({ name, rating, logo, description, bonus }: SportsbookProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <img src={logo} alt={name} className="h-12 w-auto" />
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{rating}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-accent font-semibold text-center">{bonus}</p>
        </div>
      </div>
    </Card>
  );
};