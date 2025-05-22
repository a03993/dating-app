import { Button } from "@/components/ui/button"
import StickersIcon from "@/assets/icons/Stickers.svg?react"
import { InputWithIcon } from "@/components/inputs/InputWithIcon"

export function MessageInput() {
  return (
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
  )
}
