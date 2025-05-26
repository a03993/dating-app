import { useEffect, useState } from "react"

import axios from "axios"

import type { MatchRelation } from "@/types/match.type"

export function useMatchedUserIds(loggedInUserId?: string) {
  const [matchedUserIds, setMatchedUserIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loggedInUserId) return

    const fetchMatches = async () => {
      try {
        const { data: matches } = await axios.get<MatchRelation[]>("http://localhost:4000/matches")

        const ids = matches
          .filter((m) => m.user1Id === loggedInUserId || m.user2Id === loggedInUserId)
          .flatMap((m) => (m.user1Id === loggedInUserId ? [m.user2Id] : [m.user1Id]))

        setMatchedUserIds(ids)
      } catch (err) {
        console.error("Failed to fetch matches:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [loggedInUserId])

  return { matchedUserIds, isLoading }
}
