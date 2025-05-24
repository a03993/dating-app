import { useState } from "react"

import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"

import ChatHeader from "@/components/ChatHeader"
import { ChatList } from "@/components/ChatList"
import { MessageList } from "@/components/MessageList"
import { MessageInput } from "@/components/inputs/MessageInput"
import { SearchInput } from "@/components/inputs/SearchInput"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { useMediaQuery } from "@/lib/hooks/useMediaQuery"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  sender: "self" | "other"
  message: string
  timestamp: string
}

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

const mockMessages: Message[] = [
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

export default function MessagesPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleSelectChat = () => {
    if (isMobile) {
      setOpenDrawer(true)
    }
  }

  return (
    <div className="mx-auto p-10 pb-30 md:p-0 flex items-center md:flex-3">
      {/* Sidebar Chat List */}
      <div
        className={cn(
          "w-full flex flex-col gap-8",
          "md:pt-25 md:pb-10 md:px-10 md:flex-2 md:h-screen md:overflow-y-auto md:border md:border-medium-gray",
        )}>
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
          <ChatList
            chats={mockChats}
            onSelectChat={handleSelectChat}
          />
        </div>
      </div>

      {/* Right Panel for Desktop */}
      <div className="hidden w-full pt-15 h-screen flex-3 md:block bg-light-gray/20">
        <div className="flex flex-col justify-between h-full p-10">
          <ChatHeader
            name="Veronica"
            lastSeen="12 minutes ago"
            avatar="image-1.jpg"
          />
          <MessageList messages={mockMessages} />
          <MessageInput />
        </div>
      </div>

      {/* Drawer for Mobile */}
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <ChatHeader
                name="Veronica"
                lastSeen="12 minutes ago"
                avatar="image-1.jpg"
              />
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <MessageList messages={mockMessages} />
          <DrawerFooter>
            <MessageInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
