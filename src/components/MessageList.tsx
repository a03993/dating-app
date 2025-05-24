import { useEffect, useRef } from "react"

import { MessageBubble } from "./MessageBubble"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isRead: boolean
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // 聊天訊息維持在底部
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" })
  }, [messages])

  return (
    <div className="my-10 overflow-y-auto flex-1">
      <div className="flex flex-col justify-end min-h-full gap-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            senderId={message.senderId}
            content={message.content}
            timestamp={message.timestamp}
            isRead={message.isRead}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
