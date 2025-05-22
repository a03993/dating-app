import { Button } from "@/components/ui/button"
import { SearchInput } from "@/components/inputs/SearchInput"

import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"

export default function MessagesPage() {
  return (
    <div className="mx-auto p-10 md:pt-25 flex items-center gap-20 md:flex-3">
      <div className="w-full flex flex-col gap-8 md:flex-2">
        {/* header */}
        <div className="flex flex-col gap-4 md:flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-medium">Messages</h1>
            <Button
              variant="outline"
              size="smSquare">
              <SettingConfigIcon />
            </Button>
          </div>
          <SearchInput />
        </div>
        <div className="flex flex-col gap-4">{/* todo: chat list component */}</div>
      </div>
      <div className="hidden w-full flex-3  md:block">{/* todo: chat component */}</div>
    </div>
  )
}
