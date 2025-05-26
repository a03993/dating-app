import { useState } from "react"

import ChatIcon from "@/assets/icons/Chat.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"
import { useNavigate } from "react-router-dom"

import ChatHeader from "@/components/chat/ChatHeader"
import { ChatList } from "@/components/chat/ChatList"
import { ChatMessages } from "@/components/chat/ChatMessages"
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

import { useConversationPreviews } from "@/lib/hooks/useConversationPreviews"
import { useMatchedUserIds } from "@/lib/hooks/useMatchedUserIds"
import { useMediaQuery } from "@/lib/hooks/useMediaQuery"
import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

export default function MessagesPage() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { loggedInUser, allUsers, isLoading } = useUserData()
  const { matchedUserIds, isLoading: isLoadingMatches } = useMatchedUserIds(loggedInUser?.id)
  const { conversations, isLoading: isLoadingConversations } = useConversationPreviews({
    loggedInUserId: loggedInUser?.id,
    allUsers,
    matchedUserIds,
    isLoadingMatches,
  })

  const [activeConversation, setActiveConversation] = useState<(typeof conversations)[0] | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  const handleSelectChat = (convoId: string) => {
    const convo = conversations.find((c) => c.id === convoId)
    if (!convo) return
    setActiveConversation(convo)
    if (isMobile) setOpenDrawer(true)
  }

  if (!loggedInUser || isLoading || isLoadingMatches || isLoadingConversations) return null

  return (
    <div className="mx-auto p-10 pb-30 md:p-0 flex md:flex-row md:h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "w-full flex flex-col gap-8",
          "md:pt-25 md:pb-10 md:px-10 md:flex-2 md:h-full md:overflow-y-auto md:border md:border-medium-gray",
        )}>
        <div className="flex flex-col gap-4">
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
        <ChatList
          chats={conversations.map((c) => ({
            id: c.id,
            name: `${c.partner.firstName} ${c.partner.lastName}`,
            avatar: c.partner.avatar,
            lastMessage: c.lastMessage,
            time: c.time,
            unreadCount: c.unreadCount,
          }))}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Desktop Right Panel */}
      <div className="hidden h-full bg-light-gray/20 flex flex-3 pt-15 md:block">
        {activeConversation ? (
          <div className="flex flex-col justify-between h-full w-full p-10">
            <ChatHeader
              name={`${activeConversation.partner.firstName} ${activeConversation.partner.lastName}`}
              avatar={activeConversation.partner.avatar}
              isOnline={true}
              onClose={() => setOpenDrawer(false)}
              onProfile={() => navigate(`/profile/${activeConversation.partner.id}?from=messages`)}
            />
            {activeConversation.messages.length === 0 ? (
              <div className="flex flex-col justify-center items-center h-full w-full">
                <h1 className="text-lg font-medium text-dark-gray/50">No messages, say hi!</h1>
              </div>
            ) : (
              <ChatMessages messages={activeConversation.messages} />
            )}

            <MessageInput />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <ChatIcon className="size-20" />
            <h1 className="text-lg font-medium text-dark-gray/50">Select one of the messages</h1>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <ChatHeader
                name={`${activeConversation?.partner.firstName} ${activeConversation?.partner.lastName}`}
                isOnline={true}
                avatar={activeConversation?.partner.avatar || ""}
                onClose={() => setOpenDrawer(false)}
                onProfile={() => navigate(`/profile/${activeConversation?.partner.id}?from=messages`)}
              />
            </DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          <ChatMessages messages={activeConversation?.messages || []} />
          <DrawerFooter>
            <MessageInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
