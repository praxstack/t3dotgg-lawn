import { ArrowDownAZ, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DashboardSort } from "@/lib/dashboardSort";

const labels: Record<DashboardSort, string> = {
  "last-uploaded": "Last uploaded",
  alphabetical: "Alphabetical",
};

export function DashboardSortControl({
  value,
  onChange,
}: {
  value: DashboardSort;
  onChange: (value: DashboardSort) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label={`Sort dashboard: ${labels[value]}`}>
          {value === "last-uploaded" ? (
            <Clock3 className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowDownAZ className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{labels[value]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(nextValue) => {
            if (nextValue === "last-uploaded" || nextValue === "alphabetical") {
              onChange(nextValue);
            }
          }}
        >
          <DropdownMenuRadioItem value="last-uploaded">Last uploaded</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="alphabetical">Alphabetical</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
