import StickersIcon from "@/assets/icons/stickers.svg?react"
import VoiceSolidIcon from "@/assets/icons/voice-solid.svg?react"

import { Button } from "@/components/ui/button"

interface MessageInputProps {
  message: string
  setMessage: (message: string) => void
  onSend: (message: string) => void
}

export function MessageInput({ message, setMessage, onSend }: MessageInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex w-full items-center gap-2">
        <input
          type="text"
          value={message}
          placeholder="Your Message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim()) {
              onSend(message)
              setMessage("")
            }
          }}
          className="h-12 w-full rounded-2xl border border-medium-gray bg-white px-3 pr-10 text-black placeholder:text-dark-gray/70 outline-none"
        />
        <Button
          variant="ghost"
          size="zero"
          className="absolute right-3"
          onClick={() => {
            if (message.trim()) {
              onSend(message)
              setMessage("")
            }
          }}>
          <StickersIcon className="text-dark-gray" />
        </Button>
      </div>

      <Button
        variant="outline"
        size="smSquare"
        onClick={() => console.log("start voice recording")}>
        <VoiceSolidIcon />
      </Button>
    </div>
  )
}
