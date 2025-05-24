import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import MoreIcon from "@/assets/icons/More.svg?react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

interface ChatHeaderProps {
  name: string
  lastSeen: string
  avatar: string
}

export default function ChatHeader({ name, lastSeen, avatar }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="smSquare"
          className="text-dark-gray hover:border-dark-gray active:bg-dark-gray">
          <LeftArrowIcon />
        </Button>
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm font-normal text-dark-gray">{lastSeen}</p>
        </div>
      </div>
      <Button
        variant="outline"
        size="smSquare"
        className="text-dark-gray hover:border-dark-gray active:bg-dark-gray">
        <MoreIcon />
      </Button>
    </div>
  )
}
