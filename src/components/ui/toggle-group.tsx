import * as React from "react"

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { toggleVariants } from "@/components/ui/toggle"

import { cn } from "@/lib/utils"

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
})

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex h-14 w-full items-center rounded-2xl border border-medium-gray",
        className,
      )}
      {...props}>
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "flex-1 h-full shrink-0 shadow-none rounded-none first:rounded-l-lg last:rounded-r-lg font-normal cursor-pointer",
        "hover:text-red active:bg-red/20 active:text-red data-[state=on]:bg-red data-[state=on]:text-white data-[state=on]:font-medium",
        "relative after:content-[''] after:absolute after:top-1/2 after:right-0 after:translate-y-[-50%] after:w-px after:h-1/2 after:bg-medium-gray last:after:hidden data-[state=on]:after:hidden",
        className,
      )}
      {...props}>
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
