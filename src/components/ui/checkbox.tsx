import * as React from "react"

import CheckIcon from "@/assets/icons/check.svg?react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils/cn"

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-dark-gray data-[state=checked]:text-red size-4 shrink-0 rounded-sm border outline-none cursor-pointer",
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center transition-none">
        <CheckIcon className="size-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
