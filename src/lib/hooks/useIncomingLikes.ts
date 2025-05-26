import { useCallback, useEffect, useState } from "react"

import axios from "axios"

import type { LikeRelation } from "@/types/like.type"
import type { MatchRelation } from "@/types/match.type"
import type { LikedUser, User } from "@/types/user.types"

interface LikedUserWithStatus extends LikedUser {
  isMatch: boolean
}

export function useIncomingLikes(currentUserId?: string, allUsers: User[] = []) {
  const [incomingLikes, setIncomingLikes] = useState<LikedUserWithStatus[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentUserId) return

    const fetchData = async () => {
      try {
        const [likesRes, matchesRes] = await Promise.all([
          axios.get<LikeRelation[]>("http://localhost:4000/likes"),
          axios.get<MatchRelation[]>("http://localhost:4000/matches"),
        ])

        const likes = likesRes.data
        const matches = matchesRes.data

        const likedByUserIds = likes.filter((like) => like.toUserId === currentUserId).map((like) => like.fromUserId)

        const usersWithStatus = likedByUserIds
          .map((id) => {
            const user = allUsers.find((u) => u.id === id)
            if (!user) return null

            const isMutualLike = likes.some((like) => like.fromUserId === currentUserId && like.toUserId === id)

            const isMatched = matches.some(
              (m) =>
                (m.user1Id === currentUserId && m.user2Id === id) || (m.user2Id === currentUserId && m.user1Id === id),
            )

            return {
              ...user,
              isMatch: isMutualLike || isMatched,
            }
          })
          .filter(Boolean) as LikedUserWithStatus[]

        setIncomingLikes(usersWithStatus)
      } catch (error) {
        console.error("Failed to fetch liked users or matches:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [currentUserId, allUsers])

  const removeUserById = useCallback((userId: string) => {
    setIncomingLikes((prev) => prev.filter((u) => u.id !== userId))
  }, [])

  const toggleMatchStatus = useCallback((userId: string) => {
    setIncomingLikes((prev) => prev.map((u) => (u.id === userId ? { ...u, isMatch: !u.isMatch } : u)))
  }, [])

  return {
    incomingLikes,
    isLoading,
    removeUserById,
    toggleMatchStatus,
  }
}
