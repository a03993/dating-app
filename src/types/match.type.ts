interface Match {
  id: string
  user1Id: string
  user2Id: string
  createdAt: string
}

export type MatchRelation = Pick<Match, "user1Id" | "user2Id">
