import CloseIcon from "@/assets/icons/Close.svg?react"
import LikeIcon from "@/assets/icons/Like.svg?react"

import { Button } from "./ui/button"
import { Card, CardContent, CardImage } from "./ui/card"

interface UserGridCardProps {
  src: string
  name: string
  age: number
  isMatch?: boolean
  onClick?: () => void
  onRemove?: () => void
  onToggleMatch?: () => void
}

export function UserGridCard({ src, name, age, isMatch, onClick, onRemove, onToggleMatch }: UserGridCardProps) {
  return (
    <Card variant="grid">
      <CardImage
        src={src}
        alt={name}
        onClick={onClick}
      />
      <CardContent className="bottom-11 p-2 text-sm font-medium backdrop-blur-none">
        {name}, {age}
      </CardContent>
      <div className="flex p-0 absolute bottom-0 w-full justify-around text-white backdrop-blur-md text-shadow-lg text-shadow-black/20">
        <Button
          variant="ghost"
          size="sm"
          className="text-white border-r border-white/20 hover:text-dark-gray"
          onClick={onRemove}>
          <CloseIcon className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:text-red"
          onClick={onToggleMatch}>
          <LikeIcon className="size-5" />
        </Button>
      </div>
      {isMatch && (
        <div className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-black/20">
          <LikeIcon className="size-5 text-red rotate-12" />
        </div>
      )}
    </Card>
  )
}
