import { DEFAULT_FILTER_OPTIONS } from "@/constants/filter-options"
import type { FilterOption } from "@/constants/filter-options"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

import { cn } from "@/lib/utils/cn"

import FilterFormContent from "./FilterFormContent"

interface FilterDrawerProps {
  open: boolean
  onOpenChange: (val: boolean) => void
  form: FilterOption
  setForm: (val: FilterOption) => void
  className?: string
}

export function FilterDrawer({ open, onOpenChange, form, setForm, className }: FilterDrawerProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}>
      <DrawerContent className={cn("p-10", className)}>
        <DrawerHeader className="flex flex-row justify-between items-start">
          <div className="flex flex-col">
            <DrawerTitle className="text-2xl font-medium">Filters</DrawerTitle>
            <DrawerDescription>Choose your preferences</DrawerDescription>
          </div>
          <Button
            variant="ghost"
            size="zero"
            onClick={() => {
              setForm(DEFAULT_FILTER_OPTIONS)
            }}>
            Clear
          </Button>
        </DrawerHeader>

        <div className="pt-10">
          <FilterFormContent
            form={form}
            setForm={setForm}
          />
        </div>

        <DrawerFooter>
          <Button
            className="w-full"
            onClick={() => {
              onOpenChange(false)
            }}>
            Continue
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
