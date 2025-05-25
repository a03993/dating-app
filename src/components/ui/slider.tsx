import * as React from "react"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils/cn"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  disabled = false,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max],
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn("relative flex w-full touch-none items-center select-none cursor-pointer", className)}
      {...props}>
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-light-gray relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        )}>
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-red absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
            disabled && "bg-dark-gray cursor-default",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={cn(
            "border-white bg-red block size-8 shrink-0 rounded-full border border-3 shadow-lg shadow-red/10 transition-[color,box-shadow] hover:shadow-red/20 active:shadow-lg active:shadow-red/25 cursor-pointer",
            disabled && "bg-dark-gray cursor-default",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
