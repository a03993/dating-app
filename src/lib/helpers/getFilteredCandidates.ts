import type { FilterOption } from "@/constants/filter-options"

import { calculateDistance } from "@/lib/utils/distance"

import type { User } from "@/types/user.types"

export function getFilteredCandidates(
  allUsers: User[],
  loggedInUserId: string,
  matchedUserIds: string[],
  filterForm: FilterOption,
): User[] {
  return allUsers.filter((u) => {
    if (u.id === loggedInUserId || matchedUserIds.includes(u.id)) return false

    if (filterForm.gender.enabled && filterForm.gender.value !== "both" && u.gender !== filterForm.gender.value)
      return false

    if (filterForm.ageRange.enabled && (u.age < filterForm.ageRange.value[0] || u.age > filterForm.ageRange.value[1]))
      return false

    const distance = calculateDistance(
      filterForm.location.value.latitude,
      filterForm.location.value.longitude,
      u.location.latitude,
      u.location.longitude,
    )

    if (filterForm.distance.enabled && distance > filterForm.distance.value) return false

    return true
  })
}
