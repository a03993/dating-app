import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-default transition-colors",
  {
    variants: {
      variant: {
        default: "bg-red text-white hover:shadow-lg hover:shadow-red/20 active:shadow-red/30",
        secondary: "bg-red/10 text-red hover:border hover:border-red active:bg-red/20",
        tertiary: [
          "bg-white [&>svg]:size-7 shadow-lg shadow-black/10 hover:shadow-black/20 active:shadow-black/30",
          "disabled:hover:shadow-black/10",
        ],
        outline: [
          "bg-white border border-medium-gray text-red",
          "hover:border-red disabled:hover:border-medium-gray",
          "active:bg-red active:border-transparent active:text-white disabled:active:bg-white disabled:active:text-red",
        ],
        selected: [
          "bg-white border border-medium-gray text-black font-normal justify-between w-full px-6 [&>svg]:size-4 [&>svg]:text-dark-gray",
          "hover:border-red hover:text-red hover:[&>svg]:text-red",
          "active:bg-red active:border-transparent active:text-white active:[&>svg]:text-white",
          "data-[active=true]:bg-red data-[active=true]:border-transparent data-[active=true]:text-white data-[active=true]:font-medium data-[active=true]:[&>svg]:text-white",
        ],
        interestSelected: [
          "justify-start px-3 bg-white border border-medium-gray text-black font-normal [&>svg]:size-5 [&>svg]:text-red [&>svg]:mr-2",
          "hover:border-red hover:text-red",
          "active:bg-red active:border-transparent active:text-white active:[&>svg]:text-white",
          "data-[active=true]:bg-red data-[active=true]:border-transparent data-[active=true]:shadow-lg data-[active=true]:shadow-red/20 data-[active=true]:text-white data-[active=true]:font-medium data-[active=true]:[&>svg]:text-white",
        ],
        navbar: [
          "bg-transparent rounded-none text-dark-gray font-medium border-t-2 border-b-2 border-transparent hover:text-red",
          "data-[active=true]:border-red data-[active=true]:font-bold data-[active=true]:text-red data-[active=true]:border-b-transparent data-[active=true]:md:border-b-2 data-[active=true]:md:border-red data-[active=true]:md:border-t-transparent",
        ],
        ghost: "bg-transparent rounded-none text-red font-bold",
      },
      size: {
        default: "h-14 w-74 text-base",
        sm: "h-11 w-35 text-sm",
        smSquare: "size-13 [&>svg]:size-6",
        smCircle: "size-19 rounded-full",
        lgSquare: "size-16 [&>svg]:size-8",
        lgCircle: "size-24 rounded-full",
        zero: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  isActive,
  disabled,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    isActive?: boolean
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-active={isActive}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled}
      {...props}
    />
  )
}

export { Button, buttonVariants }
