import { MessageBubble } from "./MessageBubble"

interface Message {
  id: string
  sender: "self" | "other"
  message: string
  timestamp: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 my-10 overflow-y-auto">
      <div className="flex flex-col justify-end min-h-full gap-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            sender={message.sender as "self" | "other"}
            message={message.message}
            timestamp={message.timestamp}
          />
        ))}
      </div>
    </div>
  )
}
