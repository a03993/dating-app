import * as React from "react"

import { countryOptions } from "@/constants/country-options"
import { ChevronDown } from "lucide-react"

import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function PhoneInput({
  value,
  onChange,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState("tw")
  const selectedOption = countryOptions.find((option) => option.key === selected)

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <div className="flex h-14 w-74 items-center rounded-xl border border-medium-gray bg-white px-3">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 text-black focus:outline-none cursor-pointer">
            {selectedOption?.icon && <selectedOption.icon className="size-4" />}
            <span className="text-sm">{selectedOption?.code}</span>
            <ChevronDown className="size-4 text-dark-gray" />
          </button>
        </PopoverTrigger>
        <div className="mx-3 h-6 w-px bg-medium-gray" />
        <input
          type="tel"
          placeholder="Enter phone number"
          className="flex-1 border-none bg-white p-0 text-black placeholder:text-dark-gray/70 focus:outline-none"
          value={value}
          onChange={onChange}
        />
      </div>
      <PopoverContent>
        <Command>
          <CommandGroup>
            {countryOptions.map((option) => (
              <CommandItem
                key={option.key}
                value={option.label}
                onSelect={() => {
                  if (option.key === "tw") {
                    setSelected(option.key)
                    setOpen(false)
                  }
                }}
                disabled={option.key !== "tw"}>
                <option.icon className="size-4" />
                <span className="flex-1">{option.label}</span>
                <span className="text-black">{option.code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
