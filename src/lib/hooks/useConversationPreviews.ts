import { useEffect, useState } from "react"

import axios from "axios"

import type { Conversation } from "@/types/conversation.type"
import type { ChatUser, User } from "@/types/user.types"

interface ConversationPreview extends Conversation {
  partner: ChatUser
  lastMessage: string
  time: string
  unreadCount: number
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

interface UseConversationPreviewsProps {
  loggedInUserId: string | undefined
  allUsers: User[]
  matchedUserIds: string[]
  isLoadingMatches: boolean
}
export function useConversationPreviews({
  loggedInUserId,
  allUsers,
  matchedUserIds,
  isLoadingMatches,
}: UseConversationPreviewsProps) {
  const [conversations, setConversations] = useState<ConversationPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loggedInUserId || isLoadingMatches) return

    async function fetchConversations() {
      try {
        const { data } = await axios.get<Conversation[]>("http://localhost:4000/conversations")

        const related = data.filter((c) => c.user1Id === loggedInUserId || c.user2Id === loggedInUserId)

        const enriched = related
          .map((c) => {
            const partnerId = c.user1Id === loggedInUserId ? c.user2Id : c.user1Id
            const partner = allUsers.find((u) => u.id === partnerId)
            if (!partner) return null

            const latest = c.messages[c.messages.length - 1]
            const time = getFriendlyTime(latest?.timestamp)
            const unreadCount = c.messages.filter((m) => m.senderId !== loggedInUserId && !m.isRead).length

            return {
              ...c,
              partner,
              lastMessage: latest?.content || "",
              time,
              unreadCount,
            }
          })
          .filter(Boolean) as ConversationPreview[]

        const conversationPartnerIds = new Set(
          enriched.map((c) => (c.user1Id === loggedInUserId ? c.user2Id : c.user1Id)),
        )

        const newMatches: ConversationPreview[] = allUsers
          .filter((u) => matchedUserIds.includes(u.id) && !conversationPartnerIds.has(u.id) && u.id !== loggedInUserId)
          .map((u) => ({
            id: `match-${u.id}`,
            user1Id: loggedInUserId!,
            user2Id: u.id,
            messages: [],
            partner: u,
            lastMessage: "You matched! Say hi 👋",
            time: "",
            unreadCount: 0,
          }))

        const merged = [...enriched, ...newMatches].sort((a, b) => {
          const timeA = new Date(a.messages[a.messages.length - 1]?.timestamp || 0).getTime()
          const timeB = new Date(b.messages[b.messages.length - 1]?.timestamp || 0).getTime()
          return timeB - timeA
        })

        setConversations(merged)
      } catch (err) {
        console.error("Failed to fetch conversations:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchConversations()
  }, [loggedInUserId, allUsers, matchedUserIds, isLoadingMatches])

  return { conversations, isLoading }
}
