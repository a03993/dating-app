import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"

import { MessageInput } from "./inputs/MessageInput"
import { MessageBubble } from "./MessageBubble"

import MoreIcon from "@/assets/icons/More.svg?react"
import VoiceSolidIcon from "@/assets/icons/VoiceSolid.svg?react"

const mockMessages = [
  {
    id: "b7e7a8cb-9f3f-4a9e-a6e2-0f8b7d2bafaa",
    sender: "other",
    message: "Hi Jake, how are you? I saw on the app that we’ve crossed paths several times this week 😄",
    timestamp: "2025-05-23T14:55:00",
  },
  {
    id: "fa0c1d6f-5e24-4a8a-b0b2-5c6fc7d34d70",
    sender: "self",
    message: "Haha truly! Nice to meet you Grace! What about a cup of coffee today evening? ☕",
    timestamp: "2025-05-23T15:02:00",
  },
  {
    id: "ac3e99e4-1bb4-4e67-bd31-d2f5b7de3a51",
    sender: "other",
    message: "Sure, let’s do it! 😊",
    timestamp: "2025-05-23T15:10:00",
  },
  {
    id: "127e2cd3-e202-4a7a-b9e0-fb6e60bbf63d",
    sender: "self",
    message: "Great I will write later the exact time and place. See you soon!",
    timestamp: "2025-05-23T15:12:00",
  },
  {
    id: "e32b85a7-51ab-46e1-9886-39f83d6c2685",
    sender: "other",
    message: "See you soon! 😊",
    timestamp: "2025-05-23T15:12:00",
  },
]

export default function ChatRoom() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="image-1.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Veronica</h1>
            <p className="text-sm text-gray-500">Last seen 12 minutes ago</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="smSquare"
          className="text-dark-gray hover:border-dark-gray active:bg-dark-gray">
          <MoreIcon />
        </Button>
      </div>
      <div className="flex-1 my-10 overflow-y-auto">
        <div className="flex flex-col justify-end min-h-full gap-4">
          {mockMessages.map((message) => (
            <MessageBubble
              key={message.id}
              sender={message.sender as "self" | "other"}
              message={message.message}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <MessageInput />
        <Button
          variant="outline"
          size="smSquare">
          <VoiceSolidIcon />
        </Button>
      </div>
    </div>
  )
}
