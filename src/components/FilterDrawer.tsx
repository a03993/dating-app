import { genderOptions, locationOptions } from "@/constants/filter-options"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { cn } from "@/lib/utils"

import { FloatingLabelSelect } from "./FloatingLabelSelect"

interface FilterDrawerProps {
  open: boolean
  onOpenChange: (val: boolean) => void
  form: any
  setForm: (val: any) => void
  className?: string
}

export function FilterDrawer({ open, onOpenChange, form, setForm, className }: FilterDrawerProps) {
  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}>
      <DrawerContent className={cn("p-10", className)}>
        <DrawerHeader className="flex flex-row justify-between items-center">
          <DrawerTitle className="text-2xl font-medium">Filters</DrawerTitle>
          <DrawerDescription></DrawerDescription>
          <div className="flex flex-row gap-2">
            <Button
              variant="ghost"
              size="zero"
              onClick={() => {
                setForm({
                  gender: "female",
                  location: "Taipei, Taiwan",
                  distance: 40,
                  ageRange: [20, 28],
                })
              }}>
              Clear
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex flex-col gap-8 pt-10">
          {/* Gender Toggle */}
          <FormSection label="Interested in">
            <div className="flex flex-col gap-8">
              <ToggleGroup
                type="single"
                value={form.gender}
                onValueChange={(val) => val && setForm({ ...form, gender: val })}>
                {genderOptions.map((option) => (
                  <ToggleGroupItem
                    key={option.value}
                    value={option.value}>
                    {option.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              {/* Location */}
              <FloatingLabelSelect
                label="Location"
                value={form.location}
                options={locationOptions}
                onChange={(val) => setForm({ ...form, location: val })}
              />
            </div>
          </FormSection>

          {/* Distance */}
          <FormSection label="Distance">
            <div className="flex items-center justify-between">
              <Slider
                value={[form.distance]}
                min={0}
                max={100}
                step={1}
                onValueChange={([val]) => setForm({ ...form, distance: val })}
              />
              <span className="text-sm text-dark-gray w-14 text-right">{form.distance}km</span>
            </div>
          </FormSection>

          {/* Age */}
          <FormSection label="Age">
            <div className="flex items-center justify-between">
              <Slider
                value={form.ageRange}
                min={18}
                max={60}
                step={1}
                onValueChange={(val) => setForm({ ...form, ageRange: val as [number, number] })}
              />
              <span className="text-sm text-dark-gray w-20 text-right">
                {form.ageRange[0]}–{form.ageRange[1]}
              </span>
            </div>
          </FormSection>
        </div>

        <DrawerFooter>
          <Button
            className="w-full"
            onClick={() => onOpenChange(false)}>
            Continue
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function FormSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8">
      <p className="font-bold">{label}</p>
      {children}
    </section>
  )
}
