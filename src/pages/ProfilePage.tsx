import { useMemo } from "react"

import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SendIcon from "@/assets/icons/Send.svg?react"
import type { FilterOption } from "@/constants/filter-options"
import { interestOptions } from "@/constants/interest-options"
import { useNavigate, useParams } from "react-router-dom"

import { UserActionPanel } from "@/components/UserActionPanel"
import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { InterestBadge } from "@/components/badges/InterestBadge"
import { Button } from "@/components/ui/button"
import { Card, CardImage } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

interface ProfilePageProps {
  filterForm: FilterOption
}

export default function ProfilePage({ filterForm }: ProfilePageProps) {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { currentUser, allUsers, isLoading } = useUserData()

  const user = useMemo(() => {
    const targetId = userId ?? currentUser?.id
    return allUsers.find((u) => u.id === targetId) ?? null
  }, [userId, currentUser, allUsers])

  if (!user || isLoading) return null

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
        <LeftArrowIcon />
      </Button>

      <div
        className={cn(
          "bg-white w-full rounded-t-3xl -mt-15 z-5 flex flex-col items-center shadow-2xl shadow-black/50",
          "md:rounded-none md:mt-0 md:h-screen md:overflow-y-auto",
        )}>
        <UserActionPanel
          className="-mt-10 z-10 md:mt-0 md:pt-25"
          onLike={() => {}}
          onDislike={() => {}}
          onProfile={() => {}}
        />

        <div className="p-10 pb-30 md:px-20 md:py-10 flex flex-col gap-8">
          {/* base info */}
          <section className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}, {user.age}
              </h1>
              <p className="text-sm text-black/70">{user.profession}</p>
            </div>
            <Button
              variant="outline"
              size="smSquare">
              <SendIcon />
            </Button>
          </section>

          {/* location */}
          <section className="flex justify-between">
            <div>
              <h2 className="text-base font-bold">Location</h2>
              <p className="text-sm text-black/70">
                {user.location.city}, {user.location.country}
              </p>
            </div>
            <DistanceBadge
              lat={filterForm.location.value.latitude}
              lon={filterForm.location.value.longitude}
              matchCandidateLat={user.location.latitude}
              matchCandidateLon={user.location.longitude}
            />
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
                return (
                  <InterestBadge
                    key={index}
                    label={label}
                  />
                )
              })}
            </div>
          </section>

          {/* gallery */}
          <section className="flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-base font-bold">Gallery</h2>
              <Button
                variant="ghost"
                size="zero">
                See all
              </Button>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <Card variant="galleryLg">
                <CardImage
                  src={`/${user.gallery[0]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Card>
              <Card variant="galleryLg">
                <CardImage
                  src={`/${user.gallery[1]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src={`/${user.gallery[2]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src={`/${user.gallery[3]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src={`/${user.gallery[4]}`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
