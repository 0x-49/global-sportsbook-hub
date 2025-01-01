import { Button } from "@/components/ui/button";

interface FiltersProps {
  onSortChange: (value: "traffic" | "name") => void;
}

export const Filters = ({ onSortChange }: FiltersProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between py-6">
      <div className="flex gap-4">
        <Button
          variant="outline"
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
    </div>
  );
};