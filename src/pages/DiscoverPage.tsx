import { useEffect, useState } from "react"

import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"
import type { FilterOption } from "@/constants/filter-options"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { UserActionPanel } from "@/components/UserActionPanel"
import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { FilterDrawer } from "@/components/filters/FilterDrawer"
import FilterPanel from "@/components/filters/FilterPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardImage } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"
import { calculateDistance } from "@/lib/utils/distance"

import { useUserData } from "@/contexts/UserDataContext"

import type { User } from "@/types/user.types"

interface DiscoverPageProps {
  filterForm: FilterOption
  setFilterForm: (val: FilterOption) => void
}

export default function DiscoverPage({ filterForm, setFilterForm }: DiscoverPageProps) {
  const navigate = useNavigate()
  const { currentUser, allUsers, isLoading } = useUserData()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [matchCandidates, setMatchCandidates] = useState<User[]>([])
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0)

  const handleLike = () => setCurrentCandidateIndex((prev) => prev + 1)
  const handleDislike = () => setCurrentCandidateIndex((prev) => prev + 1)
  const handleProfile = () => navigate(`/profile/${matchCandidates[currentCandidateIndex].id}?from=discover`)
  const handleBack = () => setCurrentCandidateIndex((prev) => Math.max(prev - 1, 0))

  useEffect(() => {
    if (!currentUser || isLoading) return

    const fetchMatchesAndFilter = async () => {
      try {
        const matchesRes = await axios.get("http://localhost:4000/matches")
        const allMatches = matchesRes.data

        const matchedUserIds = allMatches
          .filter((m: any) => m.user1Id === currentUser.id || m.user2Id === currentUser.id)
          .flatMap((m: any) => (m.user1Id === currentUser.id ? [m.user2Id] : [m.user1Id]))

        const filtered = allUsers.filter((u) => {
          if (u.id === currentUser.id || matchedUserIds.includes(u.id)) return false

          if (filterForm.gender.enabled && filterForm.gender.value !== "both" && u.gender !== filterForm.gender.value)
            return false

          if (
            filterForm.ageRange.enabled &&
            (u.age < filterForm.ageRange.value[0] || u.age > filterForm.ageRange.value[1])
          )
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

        setMatchCandidates(filtered)
        setCurrentCandidateIndex(0)
      } catch (err) {
        console.error("Failed to fetch matches:", err)
      }
    }

    fetchMatchesAndFilter()
  }, [currentUser, allUsers, filterForm, isLoading])

  if (!currentUser || isLoading) return null

  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-center items-center h-screen pb-20",
          "md:pt-15 md:pb-0 md:flex-row md:justify-start md:items-start",
        )}>
        <FilterPanel
          form={filterForm}
          setForm={setFilterForm}
          className="w-1/3 hidden md:block"
        />
        <div className="flex justify-center h-full w-full md:w-2/3">
          <div className="flex flex-col h-full justify-around">
            {/* Header */}
            <div className="flex w-full justify-between items-center">
              <Button
                variant="outline"
                size="smSquare"
                onClick={handleBack}
                disabled={currentCandidateIndex === 0}>
                <LeftArrowIcon />
              </Button>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Discover</h1>
                <p className="text-xs">
                  {filterForm.location.value.city}, {filterForm.location.value.country}
                </p>
              </div>
              <div className="block md:hidden">
                <Button
                  variant="outline"
                  size="smSquare"
                  onClick={() => setOpenDrawer(true)}>
                  <SettingConfigIcon />
                </Button>
              </div>
            </div>

            {/* 卡片區塊 */}
            <div className="relative h-112 flex justify-center items-center">
              {matchCandidates.length > currentCandidateIndex + 1 && (
                <Card
                  variant="swipeable"
                  className="absolute -top-10 z-0 scale-85 opacity-50 transition-all duration-300">
                  <CardImage
                    src={matchCandidates[currentCandidateIndex + 1].avatar}
                    alt={matchCandidates[currentCandidateIndex + 1].firstName}
                  />
                </Card>
              )}

              {matchCandidates.length > 0 && currentCandidateIndex < matchCandidates.length ? (
                <Card
                  variant="swipeable"
                  className="absolute top-2 z-10 transition-all duration-300">
                  <CardImage
                    src={matchCandidates[currentCandidateIndex].avatar}
                    alt={matchCandidates[currentCandidateIndex].firstName}
                  />
                  <DistanceBadge
                    lat={filterForm.location.value.latitude}
                    lon={filterForm.location.value.longitude}
                    matchCandidateLat={matchCandidates[currentCandidateIndex].location.latitude}
                    matchCandidateLon={matchCandidates[currentCandidateIndex].location.longitude}
                    className="absolute top-2 left-2 bg-black/20 backdrop-blur-sm text-white"
                  />
                  <CardContent>
                    <h2 className="text-2xl font-semibold">
                      {matchCandidates[currentCandidateIndex].firstName}{" "}
                      {matchCandidates[currentCandidateIndex].lastName}, {matchCandidates[currentCandidateIndex].age}
                    </h2>
                    <p className="text-sm">{matchCandidates[currentCandidateIndex].profession}</p>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  variant="swipeable"
                  className="absolute top-0 left-0 z-10 transition-all duration-300">
                  <CardImage
                    src="/src/assets/images/image01.jpg"
                    alt="No more users"
                    blur
                  />
                  <CardContent className="backdrop-blur-none">
                    <h2 className="text-2xl font-semibold">No more users to discover.</h2>
                    <p className="text-sm">Please come back later, or adjust your search criteria.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <UserActionPanel
              onLike={handleLike}
              onDislike={handleDislike}
              onProfile={handleProfile}
              disabled={currentCandidateIndex === matchCandidates.length}
            />
          </div>
        </div>
      </div>

      <FilterDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        form={filterForm}
        setForm={setFilterForm}
      />
    </>
  )
}
