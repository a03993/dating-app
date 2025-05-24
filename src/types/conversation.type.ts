export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isRead: boolean
}

export type MessagePreview = Pick<Message, "senderId" | "content" | "timestamp" | "isRead">

export interface Conversation {
  id: string
  user1Id: string
  user2Id: string
  messages: Message[]
}
