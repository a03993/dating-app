import * as React from "react"

import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils/cn"

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      {...props}
    />
  )
}

function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...props}
    />
  )
}

function PopoverContent({
  align = "center",
  side = "bottom",
  sideOffset = 20,
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn("bg-white text-medium-gray rounded-2xl border shadow-md outline-hidden", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverContent }
