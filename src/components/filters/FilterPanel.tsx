import { DEFAULT_FILTER_OPTIONS } from "@/constants/filter-options"
import type { FilterOption } from "@/constants/filter-options"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils/cn"

import FilterFormContent from "./FilterFormContent"

interface FilterPanelProps {
  form: FilterOption
  setForm: (val: FilterOption) => void
  className?: string
}

export default function FilterPanel({ form, setForm, className }: FilterPanelProps) {
  return (
    <div className={cn("w-full h-full px-10 border-r border-medium-gray", className)}>
      <div className="flex flex-col h-full justify-center">
        <div className="flex justify-between items-start">
          <div className="flex flex-col ">
            <p className="text-2xl font-medium">Filters</p>
            <p className="text-dark-gray text-sm">Choose your preferences</p>
          </div>
          <Button
            variant="ghost"
            size="zero"
            onClick={() => {
              setForm(DEFAULT_FILTER_OPTIONS)
            }}>
            Clear
          </Button>
        </div>
        <FilterFormContent
          form={form}
          setForm={setForm}
        />
      </div>
    </div>
  )
}
