import { useMemo } from "react"

import ArrowLeftIcon from "@/assets/icons/arrow-left.svg?react"
import EditIcon from "@/assets/icons/edit.svg?react"
import SendIcon from "@/assets/icons/send.svg?react"
import type { FilterOption } from "@/constants/filter-options"
import { interestOptions } from "@/constants/interest-options"
import { useNavigate, useParams } from "react-router-dom"

import { ProfileGallery } from "@/components/ProfileGallery"
import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { InterestBadge } from "@/components/badges/InterestBadge"
import { Button } from "@/components/ui/button"
import { Card, CardImage } from "@/components/ui/card"

import { useMatchedUserIds } from "@/lib/hooks/useMatchedUserIds"
import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

interface ProfilePageProps {
  filterForm: FilterOption
}

export default function ProfilePage({ filterForm }: ProfilePageProps) {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { loggedInUser, allUsers, isLoading } = useUserData()
  const { matchedUserIds } = useMatchedUserIds(loggedInUser?.id)

  const user = useMemo(() => {
    const targetId = userId ?? loggedInUser?.id
    return allUsers.find((u) => u.id === targetId) ?? null
  }, [userId, loggedInUser, allUsers])

  if (!user || isLoading) return null

  const isOtherProfile = user.id !== loggedInUser?.id
  const hasMatched = matchedUserIds.includes(user.id)
  const sharedInterests = isOtherProfile
    ? user.interests.filter((interest) => loggedInUser?.interests.includes(interest))
    : []

  return (
    <div className="flex flex-col md:flex-row items-center">
      <Card
        variant="profile"
        className="relative">
        <CardImage
          src={`/${user.avatar}`}
          alt={`${user.firstName} ${user.lastName}`}
        />
      </Card>

      <Button
        variant="outline"
        size="smSquare"
        className="absolute top-5 left-5 md:top-25 text-white bg-white/25 hover:border-white active:bg-white/50"
        onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
      </Button>

      <div
        className={cn(
          "bg-white w-full rounded-t-3xl -mt-15 z-5 flex flex-col items-center shadow-2xl shadow-black/50",
          "md:rounded-none md:mt-0 md:h-screen md:overflow-y-auto",
        )}>
        <div className="p-10 pb-30 md:px-20 md:pt-25 md:pb-10 flex flex-col gap-8">
          {/* base info */}
          <section className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}, {user.age}
              </h1>
              <p className="text-sm text-black/70">{user.profession}</p>
            </div>

            {isOtherProfile ? (
              <Button
                variant="outline"
                size="smSquare"
                disabled={!hasMatched}>
                <SendIcon />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="smSquare"
                // todo: add edit profile page
                onClick={() => console.log("edit profile")}>
                <EditIcon />
              </Button>
            )}
          </section>

          {/* location */}
          <section className="flex justify-between">
            <div>
              <h2 className="text-base font-bold">Location</h2>
              <p className="text-sm text-black/70">
                {user.location.city}, {user.location.country}
              </p>
            </div>
            {isOtherProfile && (
              <DistanceBadge
                lat={filterForm.location.value.latitude}
                lon={filterForm.location.value.longitude}
                matchCandidateLat={user.location.latitude}
                matchCandidateLon={user.location.longitude}
              />
            )}
          </section>

          {/* about */}
          <section>
            <h2 className="text-base font-bold">About</h2>
            <p className="text-sm text-black/70">{user.about}</p>
          </section>

          {/* interests */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-bold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => {
                const label = interestOptions.find((i) => i.id === interest)?.label || "Unknown"
                const isMatch = sharedInterests.includes(interest)

                return (
                  <InterestBadge
                    key={index}
                    label={label}
                    isMatch={isMatch}
                  />
                )
              })}
            </div>
          </section>

          {/* gallery */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-bold">Gallery</h2>
            <ProfileGallery
              images={user.gallery}
              userName={`${user.firstName} ${user.lastName}`}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
