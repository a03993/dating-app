import MapPinIcon from "@/assets/icons/map-pin.svg?react"

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
  const distanceInKm = calculateDistance(lat, lon, matchCandidateLat, matchCandidateLon)

  return (
    <Badge
      variant="distance"
      className={cn(className)}>
      <MapPinIcon className="size-3.5" />
      {distanceInKm == 0 ? <span>In the same area</span> : <span>{distanceInKm}km</span>}
    </Badge>
  )
}
