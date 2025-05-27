import HeartIcon from "@/assets/icons/heart.svg?react"
import RemoveIcon from "@/assets/icons/remove.svg?react"
import UserIcon from "@/assets/icons/user.svg?react"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils/cn"

interface UserActionPanelProps {
  onLike: () => void
  onDislike: () => void
  onProfile: () => void
  disabled?: boolean
  className?: string
}

export function UserActionPanel({ onLike, onDislike, onProfile, disabled, className }: UserActionPanelProps) {
  return (
    <div className={cn("flex w-74 justify-between items-center", className)}>
      <Button
        variant="tertiary"
        size="smCircle"
        onClick={onDislike}
        disabled={disabled}>
        <RemoveIcon className="text-orange" />
      </Button>
      <Button
        variant="tertiary"
        size="lgCircle"
        className="bg-red [&>svg]:size-13 shadow-red/20 hover:shadow-red/40 active:shadow-red/50"
        onClick={onLike}
        disabled={disabled}>
        <HeartIcon className="text-white" />
      </Button>
      <Button
        variant="tertiary"
        size="smCircle"
        onClick={onProfile}
        disabled={disabled}>
        <UserIcon className="text-purple" />
      </Button>
    </div>
  )
}
