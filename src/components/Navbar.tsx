import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

import CardsIcon from "@/assets/icons/Cards.svg?react"
import LikeIcon from "@/assets/icons/Like.svg?react"
import LogoIcon from "@/assets/Logo.svg?react"
import MessageIcon from "@/assets/icons/Message.svg?react"
import PeopleIcon from "@/assets/icons/People.svg?react"

const iconStyle = "size-6"

const navItems = [
  { key: "discover", icon: <CardsIcon className={iconStyle} />, label: "Discover" },
  { key: "likes", icon: <LikeIcon className={iconStyle} />, label: "Likes" },
  { key: "messages", icon: <MessageIcon className={iconStyle} />, label: "Messages" },
  { key: "profile", icon: <PeopleIcon className={iconStyle} />, label: "Profile" },
]

export function Navbar({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <nav
      className={cn(
        "z-50 flex w-full items-center bg-light-gray border-t border-medium-gray px-4",
        "fixed bottom-0 pb-5 justify-around",
        "md:static md:top-0 md:border-t-0 md:border-b md:justify-start md:gap-2 md:px-6 md:pb-0",
      )}>
      <span className="hidden md:flex items-center gap-2 pr-10">
        <LogoIcon className="size-7" />
        <span className="font-bold text-black">Dating App</span>
      </span>
      {navItems.map((item) => (
        <Button
          variant="navbar"
          size="lgSquare"
          className="md:w-26"
          isActive={activeTab === item.key}
          onClick={() => setActiveTab(item.key)}>
          <span className="block md:hidden">{item.icon}</span>
          <span className="hidden md:block">{item.label}</span>
        </Button>
      ))}
    </nav>
  )
}
