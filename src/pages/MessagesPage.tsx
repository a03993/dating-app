import { useEffect, useState } from "react"

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

import { useMediaQuery } from "@/lib/hooks/useMediaQuery"
import { cn } from "@/lib/utils"

import { useCurrentUser } from "@/contexts/UserContext"

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
  const currentUser = useCurrentUser()
  const [conversations, setConversations] = useState<ConversationPreview[]>([])
  const [activeConversation, setActiveConversation] = useState<ConversationPreview | null>(null)
  const [openDrawer, setOpenDrawer] = useState(false)

  useEffect(() => {
    if (!currentUser) return

    async function fetchData() {
      const res = await fetch("http://localhost:4000/conversations")
      const data: Conversation[] = await res.json()

      // 只顯示與當前用戶有關的對話
      const related = data.filter((c) => c.user1Id === currentUser?.id || c.user2Id === currentUser?.id)

      // 將對話夥伴資料與對話訊息合併
      const enriched = await Promise.all(
        related.map(async (c) => {
          const partnerId = c.user1Id === currentUser?.id ? c.user2Id : c.user1Id
          const partnerRes = await fetch(`http://localhost:4000/users/${partnerId}`)
          const partner = await partnerRes.json()

          const latest = c.messages[c.messages.length - 1]
          const time = getFriendlyTime(latest?.timestamp)

          const unreadCount = c.messages.filter((m) => m.senderId !== currentUser?.id && !m.isRead).length

          return {
            ...c,
            partner,
            lastMessage: latest?.content || "",
            time,
            unreadCount,
          }
        }),
      )

      // 將對話按最新訊息時間降冪排序
      setConversations(
        enriched.sort((a, b) => {
          const timeA = new Date(a.messages[a.messages.length - 1]?.timestamp || 0).getTime()
          const timeB = new Date(b.messages[b.messages.length - 1]?.timestamp || 0).getTime()
          return timeB - timeA
        }),
      )
      if (enriched.length > 0) setActiveConversation(enriched[0])
    }

    fetchData()
  }, [currentUser])

  function handleSelectChat(convoId: string) {
    const convo = conversations.find((c) => c.id === convoId)
    if (!convo) return
    setActiveConversation(convo)
    if (isMobile) setOpenDrawer(true)
  }

  if (!currentUser) return null

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
        <div>
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
      </div>

      {/* Desktop Right Panel */}
      <div className="hidden h-full bg-light-gray/20 flex flex-3 pt-15 md:block">
        {activeConversation && (
          <div className="flex flex-col justify-between h-full w-full p-10">
            <ChatHeader
              name={`${activeConversation.partner.firstName} ${activeConversation.partner.lastName}`}
              avatar={activeConversation.partner.avatar}
              isOnline={true} // todo: 從後端取得
              onClose={() => setOpenDrawer(false)}
              onProfile={() => navigate(`/profile/${activeConversation.partner.id}?from=messages`)}
            />
            <ChatMessages
              messages={activeConversation.messages.map((m) => ({
                id: m.id,
                senderId: m.senderId,
                content: m.content,
                timestamp: m.timestamp,
                isRead: m.isRead,
              }))}
            />
            <MessageInput />
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
                isOnline={true} // todo: 從後端取得
                avatar={activeConversation?.partner.avatar || ""}
                onClose={() => setOpenDrawer(false)}
                onProfile={() => navigate(`/profile/${activeConversation?.partner.id}?from=messages`)}
              />
            </DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <ChatMessages
            messages={
              activeConversation?.messages.map((m) => ({
                id: m.id,
                senderId: m.senderId,
                content: m.content,
                timestamp: m.timestamp,
                isRead: m.isRead,
              })) || []
            }
          />
          <DrawerFooter>
            <MessageInput />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

function getFriendlyTime(timestamp: string): string {
  const now = new Date()
  const then = new Date(timestamp)
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000 / 60)

  if (diff < 1) return "just now"
  if (diff < 60) return `${diff}min`
  if (diff < 1440) return `${Math.floor(diff / 60)}h`
  return `${Math.floor(diff / 1440)}d`
}
