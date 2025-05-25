import * as React from "react"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const badgeVariants = cva("inline-flex items-center justify-center rounded-md w-fit h-fit whitespace-nowrap shrink-0", {
  variants: {
    variant: {
      distance: "bg-red/10 text-red text-sm font-medium p-1",
      interest: "h-10 w-32 border border-medium-gray",
      unread: "bg-red text-white min-w-6 h-6 rounded-full text-sm font-medium",
    },
  },
})

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
