import type { LocationOption } from "@/constants/filter-options"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils/cn"

interface FloatingLabelSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: LocationOption[]
  disabled?: boolean
}

export function FloatingLabelSelect({ label, value, onChange, options, disabled }: FloatingLabelSelectProps) {
  return (
    <div className="relative w-full">
      {/* Floating label */}
      <label
        className={cn(
          "absolute left-3 transform bg-white px-2 text-dark-gray transition-all",
          value && "-top-3 left-0 scale-80",
        )}>
        {label}
      </label>

      <Select
        disabled={disabled}
        value={value}
        onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "peer h-14 w-full appearance-none rounded-2xl border border-medium-gray bg-white px-4 text-black placeholder-transparent outline-none transition-all",
          )}>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={`${opt.latitude}-${opt.longitude}`}
              value={opt.label}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
