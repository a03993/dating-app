import LocalIcon from "@/assets/icons/Local.svg?react"

import { Badge } from "../ui/badge"

interface DistanceBadgeProps {
  distanceInMeters: number
}

export function DistanceBadge({ distanceInMeters }: DistanceBadgeProps) {
  const distanceInKm = (distanceInMeters / 1000).toFixed(1)

  return (
    <Badge variant="distance">
      <LocalIcon className="size-3.5" />
      {distanceInKm} km
    </Badge>
  )
}
