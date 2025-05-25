import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"

interface Option {
  value: string
  label: string
}

interface FloatingLabelSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
}

export function FloatingLabelSelect({ label, value, onChange, options }: FloatingLabelSelectProps) {
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
              key={opt.value}
              value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
