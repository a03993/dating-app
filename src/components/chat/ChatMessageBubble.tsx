import DoubleCheckIcon from "@/assets/icons/double-check.svg?react"

import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

import type { MessagePreview } from "@/types/conversation.type"

const formattedTime = (timestamp: string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timestamp))
}

export function ChatMessageBubble({ senderId, content, timestamp, isRead }: MessagePreview) {
  const { loggedInUser } = useUserData()

  const isSelf = senderId === loggedInUser?.id
  const style = isSelf ? "rounded-bl-lg bg-light-gray" : "rounded-br-lg bg-red/10"

  return (
    <div className={cn("flex", isSelf ? "justify-end" : "justify-start")}>
      <div className={cn("flex flex-col gap-1", isSelf ? "items-end" : "items-start")}>
        <div className={cn("p-4 w-fit h-fit max-w-85 rounded-t-lg", style)}>{content}</div>
        <div className="flex items-center gap-1">
          <p className="text-xs text-gray-500">{formattedTime(timestamp)}</p>
          {isSelf && isRead && <DoubleCheckIcon className="size-4 text-red" />}
        </div>
      </div>
    </div>
  )
}
