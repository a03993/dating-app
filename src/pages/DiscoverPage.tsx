import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"

import { UserActionPanel } from "@/components/UserActionPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardImage } from "@/components/ui/card"

export default function DiscoverPage() {
  return (
    <div className="mx-auto p-10 pb-30 md:pt-25 flex flex-col items-center gap-8">
      <div className="flex w-full justify-between items-center">
        <Button
          variant="outline"
          size="smSquare">
          <LeftArrowIcon />
        </Button>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-semibold">Discover</h1>
          <p className="text-xs">Taiwan, Taipei</p>
        </div>
        <Button
          variant="outline"
          size="smSquare">
          <SettingConfigIcon />
        </Button>
      </div>
      <Card variant="swipeable">
        <CardImage
          src="image-1.jpg"
          alt="Jessica"
        />
        <CardContent className="block">
          <h2 className="text-2xl font-semibold">Jessica Parker, 23</h2>
          <p className="text-sm">Professional model</p>
        </CardContent>
      </Card>
      <UserActionPanel />
    </div>
  )
}
