import { Checkbox } from "@/components/ui/checkbox"

import { cn } from "@/lib/utils/cn"

interface FormSectionProps {
  label: string
  description?: string
  enabled: boolean
  onCheckedChange: (enabled: boolean) => void
  children: React.ReactNode
  className?: string
}

export default function FormSection({
  label,
  description,
  enabled,
  onCheckedChange,
  children,
  className,
}: FormSectionProps) {
  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <div className="flex items-center gap-2">
        {label !== "Interested in" && (
          <Checkbox
            checked={enabled}
            onCheckedChange={onCheckedChange}
          />
        )}
        <p className={cn("font-bold", !enabled && "text-dark-gray")}>{label}</p>
        {enabled && <p className="text-sm text-dark-gray">{description}</p>}
      </div>
      {children}
    </section>
  )
}
