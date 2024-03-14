import { Separator } from "@/components/ui/separator";

export function DropIndicator({
  beforeId,
  column,
}: {
  beforeId: string;
  column: string;
}) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="h-2 w-full bg-zinc-500 rounded-sm my-1 opacity-0"
    >
      <Separator />
    </div>
  );
}
