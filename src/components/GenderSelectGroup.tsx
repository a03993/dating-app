import { useState } from "react"

import CheckSmallIcon from "../assets/icons/CheckSmall.svg?react"
import RightArrowIcon from "../assets/icons/RightArrow.svg?react"
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
        <CheckSmallIcon />
      </Button>
      <Button
        variant="selected"
        isActive={selectedGender === "man"}
        onClick={() => setSelectedGender("man")}>
        Man
        <CheckSmallIcon />
      </Button>
      {/* TODO: add selection for other gender */}
      <Button
        variant="selected"
        isActive={selectedGender === "other"}
        onClick={() => setSelectedGender("other")}>
        Other
        <RightArrowIcon />
      </Button>
    </div>
  )
}
