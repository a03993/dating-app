import { Button } from "@/components/ui/button"
import { Card, CardImage } from "@/components/ui/card"

import { DistanceBadge } from "@/components/badges/DistanceBadge"
import { InterestBadge } from "@/components/badges/InterestBadge"
import { UserActionPanel } from "@/components/UserActionPanel"

import SendIcon from "@/assets/icons/Send.svg?react"
import { cn } from "@/lib/utils"

export default function ProfilePage() {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <Card variant="profile">
        <CardImage
          src="image-1.jpg"
          alt="Veronica"
        />
      </Card>

      <div
        className={cn(
          "bg-white w-full rounded-t-3xl -mt-15 z-5 flex flex-col items-center shadow-2xl shadow-black/50",
          "md:rounded-none md:mt-0 md:h-screen md:overflow-y-auto",
        )}>
        <UserActionPanel className="-mt-10 z-10 md:mt-0 md:pt-25" />

        <div className="p-10 pb-30 md:px-20 md:py-10 flex flex-col gap-8">
          {/* base info */}
          <section className="flex justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Veronica Lane , 25</h1>
              <p className="text-sm text-black/70">Fashion model</p>
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
              <p className="text-sm text-black/70">Taipei, Taiwan</p>
            </div>
            <DistanceBadge distanceInMeters={850} />
          </section>

          {/* about */}
          <section>
            <h2 className="text-base font-bold">About</h2>
            <p className="text-sm text-black/70">
              Passionate about classic cars and timeless fashion. I enjoy photoshoots, city drives, and good
              conversations over coffee.
            </p>
          </section>

          {/* interests */}
          <section className="flex flex-col gap-4">
            <h2 className="text-base font-bold">Interests</h2>
            <div className="flex flex-wrap gap-2">
              <InterestBadge
                label="Photography"
                isMatch
              />
              <InterestBadge label="Shopping" />
              <InterestBadge label="Karaoke" />
              <InterestBadge label="Yoga" />
              <InterestBadge
                label="Art"
                isMatch
              />
              <InterestBadge label="Traveling" />
              <InterestBadge label="Drinking" />
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
                  src="image-1.jpg"
                  alt="Veronica"
                />
              </Card>
              <Card variant="galleryLg">
                <CardImage
                  src="image-2.jpg"
                  alt="Veronica"
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src="image-3.jpg"
                  alt="Veronica"
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src="image-4.jpg"
                  alt="Veronica"
                />
              </Card>
              <Card variant="gallerySm">
                <CardImage
                  src="image-5.jpg"
                  alt="Veronica"
                />
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
