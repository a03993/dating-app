import type { Location } from "@/types/user.types"

export interface LocationOption extends Location {
  label: string
}

interface GenderOption {
  value: string
  label: string
}

export interface FilterOption {
  gender: { enabled: boolean; value: string }
  location: { enabled: boolean; value: LocationOption }
  distance: { enabled: boolean; value: number }
  ageRange: { enabled: boolean; value: [number, number] }
}

export const locationOptions: LocationOption[] = [
  { city: "Taipei", country: "Taiwan", latitude: 25.0375, longitude: 121.5639, label: "Taipei, Taiwan" },
  { city: "New Taipei", country: "Taiwan", latitude: 25.0169, longitude: 121.4628, label: "New Taipei, Taiwan" },
  { city: "Taichung", country: "Taiwan", latitude: 24.1469, longitude: 120.6819, label: "Taichung, Taiwan" },
  { city: "Tainan", country: "Taiwan", latitude: 23.0, longitude: 120.2, label: "Tainan, Taiwan" },
  { city: "Kaohsiung", country: "Taiwan", latitude: 22.6194, longitude: 120.3, label: "Kaohsiung, Taiwan" },
]

export const genderOptions: GenderOption[] = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "both", label: "Both" },
]

export const DEFAULT_FILTER_OPTIONS: FilterOption = {
  gender: { enabled: true, value: "both" },
  location: {
    enabled: true,
    value: {
      city: "Taipei",
      country: "Taiwan",
      latitude: 25.0375,
      longitude: 121.5639,
      label: "Taipei, Taiwan",
    },
  },
  distance: { enabled: true, value: 10 },
  ageRange: { enabled: true, value: [18, 30] },
}
