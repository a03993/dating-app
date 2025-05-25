import * as React from "react"

import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils/cn"

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn("bg-white text-black flex h-full w-full flex-col overflow-hidden rounded-2xl", className)}
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn("text-black overflow-hidden p-1", className)}
      {...props}
    />
  )
}

function CommandItem({ disabled, className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none rounded-2xl",
        disabled ? "opacity-20" : "cursor-pointer hover:bg-light-gray",
        className,
      )}
      {...props}
    />
  )
}

export { Command, CommandGroup, CommandItem }
