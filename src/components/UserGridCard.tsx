import { CardContent, CardImage, Card } from "./ui/card"
import { Button } from "./ui/button"

import CloseIcon from "@/assets/icons/Close.svg?react"
import LikeIcon from "@/assets/icons/Like.svg?react"

export function UserGridCard({
  src,
  name,
  age,
  isLiked,
}: {
  src: string
  name: string
  age: number
  isLiked?: boolean
}) {
  return (
    <Card variant="grid">
      <CardImage
        src={src}
        alt={name}
      />
      <CardContent className="bottom-11 p-2 text-sm font-medium backdrop-blur-none">
        {name}, {age}
      </CardContent>
      <div className="flex p-0 absolute bottom-0 w-full justify-around text-white backdrop-blur-md text-shadow-lg text-shadow-black/20">
        <Button
          variant="ghost"
          size="sm"
          className="text-white border-r border-white/20 hover:text-dark-gray">
          <CloseIcon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-red">
          <LikeIcon className="size-5" />
        </Button>
      </div>
      {isLiked && (
        <div className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-black/20">
          <LikeIcon className="size-5 text-red rotate-12" />
        </div>
      )}
    </Card>
  )
}
