import LocalIcon from "@/assets/icons/Local.svg?react"

import { cn } from "@/lib/utils/cn"
import { calculateDistance } from "@/lib/utils/distance"

import { Badge } from "../ui/badge"

interface DistanceBadgeProps {
  lat: number
  lon: number
  matchCandidateLat: number
  matchCandidateLon: number
  className?: string
}

export function DistanceBadge({ lat, lon, matchCandidateLat, matchCandidateLon, className }: DistanceBadgeProps) {
  const distanceInKm = Math.round(calculateDistance(lat, lon, matchCandidateLat, matchCandidateLon) / 1000)

  return (
    <Badge
      variant="distance"
      className={cn(className)}>
      <LocalIcon className="size-3.5" />
      {distanceInKm}km
    </Badge>
  )
}
