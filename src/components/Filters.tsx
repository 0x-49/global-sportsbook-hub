import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  onSortChange: (value: string) => void;
}

export const Filters = ({ onSortChange }: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between py-6">
      <div className="flex gap-4">
        <Button variant="outline">All</Button>
        <Button variant="outline">Top Rated</Button>
        <Button variant="outline">Best Bonuses</Button>
      </div>
      <select
        className="border rounded-md px-4 py-2"
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="rating">Sort by Rating</option>
        <option value="name">Sort by Name</option>
        <option value="bonus">Sort by Bonus</option>
      </select>
    </div>
  );
};