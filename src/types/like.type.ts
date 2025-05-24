interface Like {
  id: string
  fromUserId: string
  toUserId: string
  createdAt: string
}

export type LikeRelation = Pick<Like, "fromUserId" | "toUserId">
