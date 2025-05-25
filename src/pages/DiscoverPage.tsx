import { useEffect, useState } from "react"

import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"
import { DEFAULT_FILTER_OPTIONS } from "@/constants/filter-options"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { UserActionPanel } from "@/components/UserActionPanel"
import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { FilterDrawer } from "@/components/filters/FilterDrawer"
import FilterPanel from "@/components/filters/FilterPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardImage } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import { useCurrentUser } from "@/contexts/UserContext"

import type { User } from "@/types/user.types"

export default function DiscoverPage() {
  const navigate = useNavigate()
  const currentUser = useCurrentUser()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [filterForm, setFilterForm] = useState(DEFAULT_FILTER_OPTIONS)
  const [matchCandidates, setMatchCandidates] = useState<User[]>([])
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0)

  const handleLike = () => {
    // todo: 新增 like 到 db
    setCurrentCandidateIndex((prev) => prev + 1)
  }

  const handleDislike = () => {
    // todo: 送出 dislike 到 db
    setCurrentCandidateIndex((prev) => prev + 1)
  }

  const handleProfile = () => {
    navigate(`/profile/${matchCandidates[currentCandidateIndex].id}?from=discover`)
  }

  const handleBack = () => {
    setCurrentCandidateIndex((prev) => Math.max(prev - 1, 0))
  }

  useEffect(() => {
    if (!currentUser) return

    const fetchUnmatchedUsers = async () => {
      try {
        const [usersRes, matchesRes] = await Promise.all([
          axios.get("http://localhost:4000/users"),
          axios.get("http://localhost:4000/matches"),
        ])

        const allUsers = usersRes.data
        const allMatches = matchesRes.data

        // 找出與 currentUser 有 match 的人
        const matchedUserIds = allMatches
          .filter((m: any) => m.user1Id === currentUser.id || m.user2Id === currentUser.id)
          .flatMap((m: any) => (m.user1Id === currentUser.id ? [m.user2Id] : [m.user1Id]))

        // 過濾掉 currentUser 本人 和已 match 的人
        const result = allUsers.filter((u: User) => u.id !== currentUser.id && !matchedUserIds.includes(u.id))

        setMatchCandidates(result)
      } catch (err) {
        console.error("Failed to fetch users or matches", err)
      }
    }

    fetchUnmatchedUsers()
  }, [currentUser])

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
                <p className="text-xs">Taiwan, Taipei</p>
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
              {/* 下一張卡片:底層 */}
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
              {currentCandidateIndex === matchCandidates.length - 1 && (
                <Card
                  variant="swipeable"
                  className="absolute -top-10 z-0 scale-85 opacity-50 transition-all duration-300">
                  <CardImage
                    src="/src/assets/images/image01.jpg"
                    alt="No more users"
                  />
                </Card>
              )}

              {/* 當前卡片: 上層 */}
              {matchCandidates.length > 0 && currentCandidateIndex < matchCandidates.length ? (
                <Card
                  variant="swipeable"
                  className="absolute top-2 z-10 transition-all duration-300">
                  <CardImage
                    src={matchCandidates[currentCandidateIndex].avatar}
                    alt={matchCandidates[currentCandidateIndex].firstName}
                  />
                  <DistanceBadge
                    lat={currentUser?.location.latitude ?? 0}
                    lon={currentUser?.location.longitude ?? 0}
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
                // 沒有更多使用者
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
