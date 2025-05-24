import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  sender: "self" | "other"
  message: string
  timestamp: string
}

const formattedTime = (timestamp: string) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(timestamp))
}

export function MessageBubble({ sender, message, timestamp }: MessageBubbleProps) {
  const styles = {
    self: "rounded-bl-lg bg-light-gray",
    other: "rounded-br-lg bg-red/10",
  }
  return (
    <div className={cn("flex", sender === "self" ? "justify-end" : "justify-start")}>
      <div className={cn("flex flex-col gap-1", sender === "self" ? "items-end" : "items-start")}>
        <div className={cn("p-4 w-fit h-fit max-w-85 rounded-t-lg", styles[sender])}>{message}</div>
        <p className="text-xs text-gray-500">{formattedTime(timestamp)}</p>
      </div>
    </div>
  )
}
