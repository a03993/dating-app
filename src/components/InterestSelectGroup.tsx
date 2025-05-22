import { useState } from "react"

import { Button } from "./ui/button"

import { interestList } from "@/lib/interestList"

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
      {interestList.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          variant="interestSelected"
          size="sm"
          isActive={selectedInterests.includes(id)}
          onClick={() => toggleInterest(id)}>
          <Icon />
          {label}
        </Button>
      ))}
    </div>
  )
}
