import { genderOptions, locationOptions } from "@/constants/filter-options"

import { FloatingLabelSelect } from "@/components/FloatingLabelSelect"
import FormSection from "@/components/filters/FormSection"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export default function FilterFormContent({ form, setForm }: { form: any; setForm: (val: any) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <FormSection
        label="Interested in"
        className="gap-6">
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
          <FloatingLabelSelect
            label="Location"
            value={form.location}
            options={locationOptions}
            onChange={(val) => setForm({ ...form, location: val })}
          />
        </div>
      </FormSection>

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
  )
}
