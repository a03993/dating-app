interface LocationOption {
  value: string
  label: string
}

interface GenderOption {
  value: string
  label: string
}

export const locationOptions: LocationOption[] = [
  { value: "Taipei, Taiwan", label: "Taipei, Taiwan" },
  { value: "New Taipei, Taiwan", label: "New Taipei, Taiwan" },
  { value: "Taichung, Taiwan", label: "Taichung, Taiwan" },
  { value: "Tainan, Taiwan", label: "Tainan, Taiwan" },
  { value: "Kaohsiung, Taiwan", label: "Kaohsiung, Taiwan" },
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
