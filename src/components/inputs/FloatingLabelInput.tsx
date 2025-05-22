import * as React from "react"
import { cn } from "@/lib/utils"

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`
    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer h-14 w-74 appearance-none rounded-2xl border border-medium-gray bg-white px-3 text-black placeholder-transparent outline-none transition-all",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 transform bg-white px-2 transition-all",
            "peer-placeholder-shown:top-4 peer-placeholder-shown:text-dark-gray/70",
            "peer-focus:-top-3 peer-focus:left-0 peer-focus:scale-80 peer-focus:text-dark-gray",
            "peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:scale-80 peer-[:not(:placeholder-shown)]:text-dark-gray",
          )}>
          {label}
        </label>
      </div>
    )
  },
)

FloatingLabelInput.displayName = "FloatingOutlinedInput"
