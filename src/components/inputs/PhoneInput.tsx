import * as React from "react"

import { ChevronDown } from "lucide-react"

import { Command, CommandGroup, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { countries } from "@/lib/countries"

export function PhoneInput({
  value,
  onChange,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState("tw")

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}>
      <div className="flex h-14 w-74 items-center rounded-xl border border-medium-gray bg-white px-3">
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-1 text-black focus:outline-none cursor-pointer">
            <span className="text-xl">{countries.find((country) => country.key === selected)?.label}</span>
            <span className="text-sm">{countries.find((country) => country.key === selected)?.code}</span>
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
            {countries.map((country) => (
              <CommandItem
                key={country.key}
                value={country.name}
                onSelect={() => {
                  if (country.key === "tw") {
                    setSelected(country.key)
                    setOpen(false)
                  }
                }}
                disabled={country.key !== "tw"}>
                <span className="mr-2 text-xl">{country.label}</span>
                <span className="flex-1">{country.name}</span>
                <span className="text-black">{country.code}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
