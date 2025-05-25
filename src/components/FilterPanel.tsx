import { genderOptions, locationOptions } from "@/constants/filterOptions"

import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { cn } from "@/lib/utils"

import { FloatingLabelSelect } from "./FloatingLabelSelect"
import { Button } from "./ui/button"

interface FilterPanelProps {
  form: any
  setForm: (val: any) => void
  className?: string
}

export default function FilterPanel({ form, setForm, className }: FilterPanelProps) {
  return (
    <div className={cn("w-full h-full px-10 border-r border-medium-gray", className)}>
      <div className="flex flex-col h-full justify-around">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium">Filters</p>
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
        <div className="flex flex-col gap-8">
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
        <Button className="w-full">Continue</Button>
      </div>
    </div>
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
