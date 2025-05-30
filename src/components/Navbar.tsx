import LogoIcon from "@/assets/Logo.svg?react"
import CardsIcon from "@/assets/icons/cards.svg?react"
import HeartNotificationIcon from "@/assets/icons/heart-notification.svg?react"
// import HeartIcon from "@/assets/icons/heart.svg?react"
import MessageNotificationIcon from "@/assets/icons/message-notification.svg?react"
// import MessageIcon from "@/assets/icons/message.svg?react"
import UserIcon from "@/assets/icons/user.svg?react"
import { Link, useLocation, useSearchParams } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils/cn"

import { useUserData } from "@/contexts/UserDataContext"

const iconStyle = "size-6"

export function Navbar() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from")
  const { loggedInUser } = useUserData()

  // todo: transform to default icon
  const navItems = [
    { key: "discover", path: "/discover", icon: <CardsIcon className={iconStyle} />, label: "Discover" },
    {
      key: "matches",
      path: "/matches",
      icon: <HeartNotificationIcon className={iconStyle} />,
      // <HeartIcon className={iconStyle} />,
      label: "Matches",
    },
    {
      key: "messages",
      path: "/messages",
      icon: <MessageNotificationIcon className={iconStyle} />,
      // <MessageIcon className={iconStyle} />,
      label: "Messages",
    },
    {
      key: "profile",
      path: `/profile/${loggedInUser?.id}`,
      icon: <UserIcon className={iconStyle} />,
      label: "Profile",
    },
  ]

  return (
    <nav
      className={cn(
        "z-50 flex w-full h-20 items-center bg-light-gray border-t border-medium-gray",
        "fixed bottom-0 pb-5 justify-around",
        "md:h-15 md:top-0 md:bottom-auto md:border-t-0 md:border-b md:justify-start md:gap-2 md:px-6 md:pb-0",
      )}>
      <span className="hidden md:flex items-center gap-2 pr-10">
        <LogoIcon className="size-7" />
        <span className="font-bold text-black">Dating App</span>
      </span>
      {navItems.map((item) => {
        const isActive =
          location.pathname === item.path || (location.pathname.startsWith("/profile") && from === item.key)
        return (
          <Link
            key={item.key}
            to={item.path}>
            <Button
              variant="navbar"
              size="lgSquare"
              className="md:w-26"
              isActive={isActive}>
              <span className="block md:hidden">{item.icon}</span>
              <span className="hidden md:block">{item.label}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
