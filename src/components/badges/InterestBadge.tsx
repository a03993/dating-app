import CheckDoubleIcon from "@/assets/icons/checkDouble.svg?react"

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
      {isMatch && <CheckDoubleIcon className="size-4" />}
      {label}
    </Badge>
  )
}
