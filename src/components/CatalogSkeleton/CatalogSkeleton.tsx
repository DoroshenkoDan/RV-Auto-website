import { cn } from "@/lib/utils"

interface Props {
  className?: string
}

export function CatalogSkeleton({ className = "" }: Props) {
  return (
    <div aria-hidden="true" className={cn("", className)}>

    </div>
  )
}
