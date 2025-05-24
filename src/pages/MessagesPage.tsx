import { Button } from "@/components/ui/button"
import { ChatList } from "@/components/ChatList"
import ChatRoom from "@/components/ChatRoom"
import { SearchInput } from "@/components/inputs/SearchInput"

import { cn } from "@/lib/utils"

import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"

const mockChats = [
  {
    id: "1",
    name: "Veronica",
    avatar: "image-1.jpg",
    lastMessage: "Hello, how are you?",
    time: "12min",
    unreadCount: 1,
  },
  {
    id: "2",
    name: "Veronica",
    avatar: "image-2.jpg",
    lastMessage: "The weather is nice today",
    time: "12min",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Veronica",
    avatar: "image-3.jpg",
    lastMessage: "Do you have a minute?",
    time: "1min",
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Veronica",
    avatar: "image-4.jpg",
    lastMessage: "good night~",
    time: "30min",
    unreadCount: 1,
  },
  {
    id: "5",
    name: "Veronica",
    avatar: "image-5.jpg",
    lastMessage: "Do you want to meet up?",
    time: "5min",
    unreadCount: 21,
  },
  {
    id: "6",
    name: "Veronica",
    avatar: "image-1.jpg",
    lastMessage: "Hello, how are you?",
    time: "12min",
    unreadCount: 1,
  },
  {
    id: "7",
    name: "Veronica",
    avatar: "image-2.jpg",
    lastMessage: "The weather is nice today",
    time: "12min",
    unreadCount: 0,
  },
  {
    id: "8",
    name: "Veronica",
    avatar: "image-3.jpg",
    lastMessage: "Do you have a minute?",
    time: "1min",
    unreadCount: 0,
  },
  {
    id: "9",
    name: "Veronica",
    avatar: "image-4.jpg",
    lastMessage: "good night~",
    time: "30min",
    unreadCount: 1,
  },
  {
    id: "10",
    name: "Veronica",
    avatar: "image-5.jpg",
    lastMessage: "Do you want to meet up?",
    time: "5min",
    unreadCount: 21,
  },
]

export default function MessagesPage() {
  return (
    <div className="mx-auto p-10 pb-30 md:p-0 flex items-center md:flex-3">
      <div
        className={cn(
          "w-full flex flex-col gap-8",
          "md:pt-25 md:pb-10 md:px-10 md:flex-2 md:h-screen md:overflow-y-auto md:border md:border-dark-gray md:rounded-xl",
        )}>
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium">Messages</h1>
            <Button
              variant="outline"
              size="smSquare">
              <SettingConfigIcon />
            </Button>
          </div>
          <SearchInput />
        </div>
        <div>
          <ChatList chats={mockChats} />
        </div>
      </div>
      {/* chat room */}
      <div className="hidden w-full pt-25 px-10 pb-10 h-screen flex-3 md:block bg-light-gray/20">
        <ChatRoom />
      </div>
    </div>
  )
}
