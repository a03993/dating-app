import { useEffect, useState } from "react"

import axios from "axios"

import type { MatchRelation } from "@/types/match.type"

export function useMatchedUserIds(currentUserId?: string) {
  const [matchedUserIds, setMatchedUserIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!currentUserId) return

    const fetchMatches = async () => {
      try {
        const { data: matches } = await axios.get<MatchRelation[]>("http://localhost:4000/matches")

        const ids = matches
          .filter((m) => m.user1Id === currentUserId || m.user2Id === currentUserId)
          .flatMap((m) => (m.user1Id === currentUserId ? [m.user2Id] : [m.user1Id]))

        setMatchedUserIds(ids)
      } catch (err) {
        console.error("Failed to fetch matches:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [currentUserId])

  return { matchedUserIds, isLoading }
}
