import { Button } from "@/components/ui/button"
import { InputWithIcon } from "@/components/inputs/InputWithIcon"

import StickersIcon from "@/assets/icons/Stickers.svg?react"
import VoiceSolidIcon from "@/assets/icons/VoiceSolid.svg?react"

export function MessageInput() {
  return (
    <div className="flex items-center gap-2">
      <InputWithIcon
        placeholder="Your Message"
        icon={
          <Button
            variant="ghost"
            size="zero">
            <StickersIcon className="text-dark-gray" />
          </Button>
        }
        iconPosition="right"
        inputClassName="pr-10"
      />
      <Button
        variant="outline"
        size="smSquare">
        <VoiceSolidIcon />
      </Button>
    </div>
  )
}
