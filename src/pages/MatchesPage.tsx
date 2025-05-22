import { Button } from "@/components/ui/button"

import SortIcon from "@/assets/icons/Sort.svg?react"
import { UserGridCard } from "@/components/UserGridCard"

export default function MatchesPage() {
  return (
    <div className="mx-auto p-10 pb-30 md:pt-30 flex flex-col items-center gap-8">
      {/* mobile header */}
      <div className="block md:hidden flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-medium">Matches</h1>
          <Button
            variant="outline"
            size="smSquare">
            <SortIcon />
          </Button>
        </div>
        <p className="text-sm text-black/70">This is a list of people who have liked you and your matches.</p>
      </div>

      {/* desktop header */}
      <div className="hidden md:block">
        <div className="flex w-screen px-20 justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium">Matches</h1>
            <p className="text-sm text-black/70">This is a list of people who have liked you and your matches.</p>
          </div>
          <Button
            variant="outline"
            size="smSquare">
            <SortIcon />
          </Button>
        </div>
      </div>

      {/* user grid cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        {Array.from({ length: 10 }).map((_, index) => (
          <UserGridCard
            key={index}
            src={`image-1.jpg`}
            name="Veronica"
            age={25}
            isLiked={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  )
}
