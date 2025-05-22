import React from "react"

interface InputWithIconProps {
  placeholder: string
  icon: React.ReactNode
  iconPosition: "left" | "right"
  inputClassName?: string
  iconClassName?: string
}

export function InputWithIcon({
  placeholder,
  icon,
  iconPosition,
  inputClassName = "",
  iconClassName = "",
}: InputWithIconProps) {
  return (
    <div className="relative flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        className={`h-12 w-74 rounded-2xl border border-medium-gray bg-white px-3 text-black placeholder:text-dark-gray/70 outline-none transition-all ${inputClassName}`}
      />
      <div
        className={`absolute size-5 text-dark-gray ${iconPosition === "left" ? "left-3" : "right-3"} ${iconClassName}`}>
        {icon}
      </div>
    </div>
  )
}
