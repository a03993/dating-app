import DoubleCheckIcon from "@/assets/icons/double-check.svg?react"

import { cn } from "@/lib/utils/cn"

import { Badge } from "../ui/badge"

interface InterestBadgeProps {
  label: string
  isMatch?: boolean
}

export function InterestBadge({ label, isMatch }: InterestBadgeProps) {
  return (
    <Badge
      variant="interest"
      className={cn(isMatch && "text-red font-bold border-red")}>
      {isMatch && <DoubleCheckIcon className="size-4" />}
      {label}
    </Badge>
  )
}
