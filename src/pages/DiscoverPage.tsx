import { useState } from "react"

import LeftArrowIcon from "@/assets/icons/LeftArrow.svg?react"
import SettingConfigIcon from "@/assets/icons/SettingConfig.svg?react"

import { FilterDrawer } from "@/components/FilterDrawer"
import FilterPanel from "@/components/FilterPanel"
import { UserActionPanel } from "@/components/UserActionPanel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardImage } from "@/components/ui/card"

import { cn } from "@/lib/utils"

export default function DiscoverPage() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [form, setForm] = useState({
    gender: "both",
    location: "Taipei, Taiwan",
    distance: 10,
    ageRange: [18, 30],
  })

  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-center items-center h-screen pb-20",
          "md:pt-15 md:pb-0 md:flex-row md:justify-start md:items-start",
        )}>
        <FilterPanel
          form={form}
          setForm={setForm}
          className="w-1/3 hidden md:block"
        />
        <div className="flex justify-center h-full w-full md:w-2/3">
          <div className="flex flex-col h-full justify-around">
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
              <div className="block md:hidden">
                <Button
                  variant="outline"
                  size="smSquare"
                  onClick={() => setOpenDrawer(true)}>
                  <SettingConfigIcon />
                </Button>
              </div>
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
        </div>
      </div>

      <FilterDrawer
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        form={form}
        setForm={setForm}
      />
    </>
  )
}
