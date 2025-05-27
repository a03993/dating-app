import { useState } from "react"

import ArrowRightIcon from "../assets/icons/arrow-right.svg?react"
import CheckIcon from "../assets/icons/check.svg?react"
import { Button } from "./ui/button"

export function GenderSelectGroup() {
  const [selectedGender, setSelectedGender] = useState<"woman" | "man" | "other">("woman")

  return (
    <div className="flex flex-col gap-3">
      <Button
        variant="selected"
        isActive={selectedGender === "woman"}
        onClick={() => setSelectedGender("woman")}>
        Woman
        <CheckIcon />
      </Button>
      <Button
        variant="selected"
        isActive={selectedGender === "man"}
        onClick={() => setSelectedGender("man")}>
        Man
        <CheckIcon />
      </Button>
      {/* TODO: add selection for other gender */}
      <Button
        variant="selected"
        isActive={selectedGender === "other"}
        onClick={() => setSelectedGender("other")}>
        Other
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
