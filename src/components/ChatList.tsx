import { ChatListItem } from "./ChatListItem"
import type { ChatListItemProps } from "./ChatListItem"

interface ChatItem extends ChatListItemProps {
  id: string
}

interface ChatListProps {
  chats: ChatItem[]
}

export function ChatList({ chats }: ChatListProps) {
  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex flex-col justify-center py-4 px-2 cursor-pointer hover:bg-light-gray border-b border-medium-gray">
          <ChatListItem {...chat} />
        </div>
      ))}
    </>
  )
}
