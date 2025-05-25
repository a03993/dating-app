import { UnreadBadge } from "@/components/badges/UnreadBadge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface ChatItemProps {
  name: string
  avatar: string
  lastMessage: string
  time: string
  unreadCount: number
}

export function ChatItem({ name, avatar, lastMessage, time, unreadCount }: ChatItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3>{name}</h3>
          <p className="text-sm text-dark-gray">{lastMessage}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <p className="text-xs text-dark-gray">{time}</p>
        <UnreadBadge amount={unreadCount} />
      </div>
    </div>
  )
}
