import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import MoreIcon from "@/assets/icons/More.svg?react"

import { cn } from "@/lib/utils/cn"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

interface ChatHeaderProps {
  name: string
  avatar: string
  isOnline: boolean
  onClose: () => void
  onProfile: () => void
}

export default function ChatHeader({ name, avatar, isOnline, onClose, onProfile }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="smSquare"
          className="text-dark-gray hover:border-dark-gray active:bg-dark-gray md:hidden"
          onClick={onClose}>
          <LeftArrowIcon />
        </Button>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <div className="flex items-center gap-1">
            <div className={cn("size-2 bg-red rounded-full", isOnline ? "bg-red" : "bg-light-gray")}></div>
            <p className="text-sm font-normal text-dark-gray">Online</p>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="smSquare"
        className="text-dark-gray hover:border-dark-gray active:bg-dark-gray"
        onClick={onProfile}>
        <MoreIcon />
      </Button>
    </div>
  )
}
