import { listingCreate } from "@/lib/ordlock";
import { cn } from "@/lib/utils";

export function OrdNotice({ className }: { className?: string }) {
  if (listingCreate) return null;

  return (
    <aside
      className={cn(
        "rounded-lg border border-primary/40 bg-card p-4",
        className,
      )}
    >
      <p className="text-sm font-medium">OrdLock listing create is off</p>
      <p className="mt-1 text-sm opacity-80">
        New listings cannot be created. Buy and cancel of existing listings stay
        on.
      </p>
    </aside>
  );
}
