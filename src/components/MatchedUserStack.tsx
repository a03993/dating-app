import LikeIcon from "@/assets/icons/Like.svg?react"
import { cva } from "class-variance-authority"

import { Card, CardImage } from "./ui/card"

const iconContainerVariants = cva(
  "absolute flex items-center justify-center rounded-full bg-white shadow-md shadow-black/20 z-10",
  {
    variants: {
      size: {
        small: "h-8 w-8",
        medium: "h-10 w-10",
        large: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  },
)

const cardImageVariants = cva("absolute rounded-xl shadow-lg shadow-black/20", {
  variants: {
    size: {
      small: "h-40 w-30",
      medium: "h-60 w-40",
      large: "h-80 w-50",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

const likeIconVariants = cva("text-red", {
  variants: {
    size: {
      small: "size-3",
      medium: "size-5",
      large: "size-7",
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

export function MatchUserStack({
  user1,
  user2,
  size = "medium",
}: {
  user1: string
  user2: string
  size?: "small" | "medium" | "large"
}) {
  return (
    <Card variant="match">
      <div className={`${iconContainerVariants({ size })} top-1 right-1`}>
        <LikeIcon className={`${likeIconVariants({ size })} rotate-12`} />
      </div>
      <div className={`${iconContainerVariants({ size })} bottom-1 left-5`}>
        <LikeIcon className={`${likeIconVariants({ size })} -rotate-12`} />
      </div>
      <CardImage
        src={user2}
        alt="user2"
        className={`${cardImageVariants({ size })} top-5 right-5 rotate-5`}
      />
      <CardImage
        src={user1}
        alt="user1"
        className={`${cardImageVariants({ size })} bottom-5 left-5 -rotate-5`}
      />
    </Card>
  )
}
