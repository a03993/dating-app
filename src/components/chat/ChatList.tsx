import { ChatItem } from "./ChatItem"
import type { ChatItemProps } from "./ChatItem"

interface ChatItem extends ChatItemProps {
  id: string
}

interface ChatListProps {
  chats: ChatItem[]
  onSelectChat: (chatId: string) => void
}

export function ChatList({ chats, onSelectChat }: ChatListProps) {
  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="flex flex-col justify-center py-4 px-2 cursor-pointer hover:bg-light-gray border-b border-medium-gray"
          onClick={() => onSelectChat?.(chat.id)}>
          <ChatItem {...chat} />
        </div>
      ))}
    </>
  )
}
