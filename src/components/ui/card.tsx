import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva("overflow-hidden rounded-xl", {
  variants: {
    variant: {
      carousel: "shrink-0 w-57 h-90 opacity-70 scale-90",
      carouselCenter: "shrink-0 w-57 h-90 opacity-100 shadow-lg shadow-black/10",
      swipeable: "relative h-112 w-74 shadow-lg shadow-black/20",
      grid: "relative h-50 w-35 overflow-hidden rounded-xl",
      match: "relative h-100 w-74",
    },
  },
  defaultVariants: {
    variant: "swipeable",
  },
})

function Card({ className, variant, ...props }: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardImage({
  src,
  alt,
  className,
  fit = "cover",
}: {
  src: string
  alt?: string
  className?: string
  fit?: "cover" | "contain"
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full", fit === "cover" ? "object-cover" : "object-contain", className)}
    />
  )
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "absolute bottom-0 left-0 w-full px-6 py-4 text-white backdrop-blur-md text-shadow-lg text-shadow-black/20",
        className,
      )}>
      {children}
    </div>
  )
}

export { Card, CardImage, CardContent }
