import { cn } from "@/lib/utils";

export function navEntryClass(isActive: boolean, className?: string) {
  return cn(
    "group relative inline-flex items-center gap-x-1.5 text-nav tracking-nav whitespace-nowrap uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
    isActive ? "text-brand" : "text-canvas hover:text-brand/70",
    className,
  );
}

export function navUnderlineClass(isActive: boolean, className?: string) {
  return cn(
    "pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 transition-transform duration-300 ease-out motion-reduce:transition-none",
    isActive
      ? "scale-x-100 bg-brand"
      : "scale-x-0 bg-brand/70 group-hover:scale-x-100",
    className,
  );
}
