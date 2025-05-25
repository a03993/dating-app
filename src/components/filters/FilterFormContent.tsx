import { genderOptions, locationOptions } from "@/constants/filter-options"
import type { FilterOption } from "@/constants/filter-options"

import { FloatingLabelSelect } from "@/components/FloatingLabelSelect"
import FormSection from "@/components/filters/FormSection"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface FilterFormContentProps {
  form: FilterOption
  setForm: (val: FilterOption) => void
}

export default function FilterFormContent({ form, setForm }: FilterFormContentProps) {
  return (
    <div className="flex flex-col gap-8">
      <FormSection
        label="Interested in"
        enabled={form.gender.enabled}
        onCheckedChange={(val) => setForm({ ...form, gender: { enabled: val, value: form.gender.value } })}
        className="gap-6">
        <div className="flex flex-col gap-8">
          <ToggleGroup
            type="single"
            value={form.gender.value}
            onValueChange={(val) => val && setForm({ ...form, gender: { enabled: true, value: val } })}>
            {genderOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}>
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <FloatingLabelSelect
            label="Location"
            value={form.location.value.label}
            options={locationOptions}
            onChange={(val) => {
              const selectedLocation = locationOptions.find((option) => option.label === val)
              if (selectedLocation) {
                setForm({ ...form, location: { enabled: true, value: selectedLocation } })
              }
            }}
          />
        </div>
      </FormSection>

      <FormSection
        label="Distance"
        description="The distance from the location you choose in 'Interested in' section."
        enabled={form.distance.enabled}
        onCheckedChange={(val) => setForm({ ...form, distance: { enabled: val, value: form.distance.value } })}>
        <div className="flex items-center justify-between">
          <Slider
            value={[form.distance.value]}
            min={0}
            max={100}
            step={1}
            disabled={!form.distance.enabled}
            onValueChange={([val]) => setForm({ ...form, distance: { enabled: true, value: val } })}
          />
          <span className="text-sm text-dark-gray w-14 text-right">{form.distance.value}km</span>
        </div>
      </FormSection>

      <FormSection
        label="Age"
        enabled={form.ageRange.enabled}
        onCheckedChange={(val) => setForm({ ...form, ageRange: { enabled: val, value: form.ageRange.value } })}>
        <div className="flex items-center justify-between">
          <Slider
            value={form.ageRange.value}
            min={18}
            max={60}
            step={1}
            disabled={!form.ageRange.enabled}
            onValueChange={(val) => setForm({ ...form, ageRange: { enabled: true, value: val as [number, number] } })}
          />
          <span className="text-sm text-dark-gray w-20 text-right">
            {form.ageRange.value[0]}–{form.ageRange.value[1]}
          </span>
        </div>
      </FormSection>
    </div>
  )
}
