import * as React from "react"

import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const cardVariants = cva("overflow-hidden rounded-xl", {
  variants: {
    variant: {
      carouselPreview: "shrink-0 w-57 h-90 opacity-70 scale-90",
      carouselMain: "shrink-0 w-57 h-90 opacity-100 shadow-lg shadow-black/10",
      swipeable: "relative h-112 w-74 shadow-lg shadow-black/20",
      grid: "relative aspect-[3/4] cursor-pointer",
      match: "relative h-100 w-74",
      profile: "h-100 w-full md:h-screen rounded-none",
      galleryLg: "h-70 col-span-3",
      gallerySm: "h-40 col-span-2",
    },
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
  fit = "cover",
  blur = false,
  onClick,
  className,
}: {
  src: string
  alt: string
  fit?: "cover" | "contain"
  blur?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full", fit === "cover" ? "object-cover" : "object-contain", blur && "blur-sm", className)}
      onClick={onClick}
    />
  )
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "absolute bottom-0 w-full px-6 py-4 text-white backdrop-blur-md text-shadow-lg text-shadow-black/20",
        className,
      )}>
      {children}
    </div>
  )
}

export { Card, CardImage, CardContent }
