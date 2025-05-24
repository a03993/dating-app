import CloseIcon from "@/assets/icons/Close.svg?react"
import LikeIcon from "@/assets/icons/Like.svg?react"
import StarIcon from "@/assets/icons/Star.svg?react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function UserActionPanel({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-74 justify-between items-center", className)}>
      <Button
        variant="tertiary"
        size="smCircle">
        <CloseIcon className="text-orange" />
      </Button>
      <Button
        variant="tertiary"
        size="lgCircle"
        className="bg-red [&>svg]:size-13 shadow-red/20 hover:shadow-red/40 active:shadow-red/50">
        <LikeIcon className="text-white" />
      </Button>
      <Button
        variant="tertiary"
        size="smCircle">
        <StarIcon className="text-purple" />
      </Button>
    </div>
  )
}
