import { cn } from "@/lib/utils"

interface FormSectionProps {
  label: string
  children: React.ReactNode
  className?: string
}

export default function FormSection({ label, children, className }: FormSectionProps) {
  return (
    <section className={cn("flex flex-col gap-8", className)}>
      <p className="font-bold">{label}</p>
      {children}
    </section>
  )
}
