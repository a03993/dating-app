import { useEffect, useState } from "react"

import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"
import fallbackImage from "@/assets/images/image01.jpg"
import type { FilterOption } from "@/constants/filter-options"
import { useNavigate } from "react-router-dom"

import { UserActionPanel } from "@/components/UserActionPanel"
import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { FilterDrawer } from "@/components/filters/FilterDrawer"
import FilterPanel from "@/components/filters/FilterPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardImage } from "@/components/ui/card"

import { getFilteredCandidates } from "@/lib/helpers/getFilteredCandidates"
import { useMatchedUserIds } from "@/lib/hooks/useMatchedUserIds"
import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

import type { User } from "@/types/user.types"

interface DiscoverPageProps {
  filterForm: FilterOption
  setFilterForm: (val: FilterOption) => void
}

export default function DiscoverPage({ filterForm, setFilterForm }: DiscoverPageProps) {
  const navigate = useNavigate()
  const { currentUser, allUsers, isLoading: isLoadingUsers } = useUserData()
  const { matchedUserIds, isLoading: isLoadingMatches } = useMatchedUserIds(currentUser?.id)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [matchCandidates, setMatchCandidates] = useState<User[]>([])
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0)

  useEffect(() => {
    if (!currentUser || isLoadingUsers || isLoadingMatches) return
    const filtered = getFilteredCandidates(allUsers, currentUser.id, matchedUserIds, filterForm)
    setMatchCandidates(filtered)
    setCurrentCandidateIndex(0)
  }, [currentUser, allUsers, matchedUserIds, filterForm, isLoadingUsers, isLoadingMatches])

  if (!currentUser || isLoadingUsers || isLoadingMatches) {
    return <div className="p-10 text-center">Loading...</div>
  }

  const currentCandidate = matchCandidates[currentCandidateIndex]
  const nextCandidate = matchCandidates[currentCandidateIndex + 1]

  const handleNext = () => setCurrentCandidateIndex((prev) => prev + 1)
  const handleBack = () => setCurrentCandidateIndex((prev) => Math.max(prev - 1, 0))
  const handleProfile = () => navigate(`/profile/${currentCandidate.id}?from=discover`)

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

            <div className="relative h-112 flex justify-center items-center">
              {nextCandidate && (
                <Card
                  variant="swipeable"
                  className="absolute -top-10 z-0 scale-85 opacity-50 transition-all duration-300">
                  <CardImage
                    src={nextCandidate.avatar}
                    alt={nextCandidate.firstName}
                  />
                </Card>
              )}

              {currentCandidate ? (
                <Card
                  variant="swipeable"
                  className="absolute top-2 z-10 transition-all duration-300">
                  <CardImage
                    src={currentCandidate.avatar}
                    alt={currentCandidate.firstName}
                  />
                  <DistanceBadge
                    lat={filterForm.location.value.latitude}
                    lon={filterForm.location.value.longitude}
                    matchCandidateLat={currentCandidate.location.latitude}
                    matchCandidateLon={currentCandidate.location.longitude}
                    className="absolute top-2 left-2 bg-black/20 backdrop-blur-sm text-white"
                  />
                  <CardContent>
                    <h2 className="text-2xl font-semibold">
                      {currentCandidate.firstName} {currentCandidate.lastName}, {currentCandidate.age}
                    </h2>
                    <p className="text-sm">{currentCandidate.profession}</p>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  variant="swipeable"
                  className="absolute top-0 left-0 z-10 transition-all duration-300">
                  <CardImage
                    src={fallbackImage}
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
              onLike={handleNext}
              onDislike={handleNext}
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
