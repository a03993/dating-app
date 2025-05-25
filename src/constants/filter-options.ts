import type { Location } from "@/types/user.types"

export interface LocationOption extends Location {
  label: string
}

interface GenderOption {
  value: string
  label: string
}

export const locationOptions: LocationOption[] = [
  { city: "Taipei", country: "Taiwan", latitude: 25.0375, longitude: 121.5639, label: "Taipei, Taiwan" },
  { city: "New Taipei", country: "Taiwan", latitude: 25.0169, longitude: 121.4628, label: "New Taipei, Taiwan" },
  { city: "Taichung", country: "Taiwan", latitude: 24.1469, longitude: 120.6819, label: "Taichung, Taiwan" },
  { city: "Tainan", country: "Taiwan", latitude: 23.0, longitude: 120.2, label: "Tainan, Taiwan" },
  { city: "Kaohsiung", country: "Taiwan", latitude: 22.6194, longitude: 120.3, label: "Kaohsiung, Taiwan" },
]

export const genderOptions: GenderOption[] = [
  { value: "female", label: "Girls" },
  { value: "male", label: "Boys" },
  { value: "both", label: "Both" },
]

export const DEFAULT_FILTER_OPTIONS = {
  gender: "both",
  location: "Taipei, Taiwan",
  distance: 10,
  ageRange: [18, 30],
}
