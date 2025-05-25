import { useState } from "react"

import { interestOptions } from "@/constants/interest-options"

import { Button } from "./ui/button"

export function InterestSelectGroup() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevSelectedInterests) =>
      prevSelectedInterests.includes(interest)
        ? prevSelectedInterests.filter((i) => i !== interest)
        : [...prevSelectedInterests, interest],
    )
  }

  return (
    <div className="flex flex-wrap gap-4">
      {interestOptions.map((option) => (
        <Button
          key={option.id}
          variant="interestSelected"
          size="sm"
          isActive={selectedInterests.includes(option.id)}
          onClick={() => toggleInterest(option.id)}>
          <option.icon />
          {option.label}
        </Button>
      ))}
    </div>
  )
}
