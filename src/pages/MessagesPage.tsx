import { useEffect, useState } from "react"

import ChatBubbleIcon from "@/assets/icons/chat-bubble.svg?react"
import { useNavigate } from "react-router-dom"

import ChatHeader from "@/components/chat/ChatHeader"
import { ChatList } from "@/components/chat/ChatList"
import { ChatMessages } from "@/components/chat/ChatMessages"
import { MessageInput } from "@/components/inputs/MessageInput"
import { SearchInput } from "@/components/inputs/SearchInput"
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

import type { Conversation } from "@/types/conversation.type"
import type { ChatUser } from "@/types/user.types"

interface ConversationPreview extends Conversation {
  partner: ChatUser
  lastMessage: string
  time: string
  unreadCount: number
}
export default function MessagesPage() {
  const navigate = useNavigate()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { loggedInUser, allUsers, isLoading } = useUserData()
  const { matchedUserIds, isLoading: isLoadingMatches } = useMatchedUserIds(loggedInUser?.id)
  const { conversations: initialConversations, isLoading: isLoadingConversations } = useConversationPreviews({
    loggedInUserId: loggedInUser?.id,
    allUsers,
    matchedUserIds,
    isLoadingMatches,
  })

  const [conversations, setConversations] = useState<ConversationPreview[]>([])
  const [activeConversation, setActiveConversation] = useState<ConversationPreview | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isLoadingConversations && initialConversations.length > 0) {
      setConversations(initialConversations)
    }
  }, [initialConversations, isLoadingConversations])

  const handleSelectChat = (convoId: string) => {
    const convo = conversations.find((c) => c.id === convoId)
    if (!convo) return

    // todo: update unreadCount to 0 in conversations data
    const updatedConversations = conversations.map((c) => (c.id === convoId ? { ...c, unreadCount: 0 } : c))
    setConversations(updatedConversations)

    setActiveConversation(convo)
    if (isMobile) setOpenDrawer(true)
  }

  const handleSendMessage = (msg: string) => {
    // todo: send message to server
    console.log(`Send to ${activeConversation?.partner.firstName}:`, msg)
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
          <h1 className="text-3xl font-medium">Messages</h1>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <ChatList
          chats={conversations
            .filter((c) =>
              `${c.partner.firstName} ${c.partner.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            .map((c) => ({
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

            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={handleSendMessage}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full w-full">
            <ChatBubbleIcon className="size-20" />
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
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={handleSendMessage}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
