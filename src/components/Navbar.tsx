import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import CardsIcon from "@/assets/icons/Cards.svg?react"
import LikeIcon from "@/assets/icons/Like.svg?react"
import LogoIcon from "@/assets/Logo.svg?react"
import MessageIcon from "@/assets/icons/Message.svg?react"
import PeopleIcon from "@/assets/icons/People.svg?react"

import { useCurrentUser } from "@/contexts/UserContext"

const iconStyle = "size-6"

export function Navbar() {
  const location = useLocation()
  const currentUser = useCurrentUser()

  const navItems = [
    { key: "discover", path: "/discover", icon: <CardsIcon className={iconStyle} />, label: "Discover" },
    { key: "matches", path: "/matches", icon: <LikeIcon className={iconStyle} />, label: "Likes" },
    { key: "messages", path: "/messages", icon: <MessageIcon className={iconStyle} />, label: "Messages" },
    {
      key: "profile",
      path: `/profile/${currentUser?.id}`,
      icon: <PeopleIcon className={iconStyle} />,
      label: "Profile",
    },
  ]

  return (
    <nav
      className={cn(
        "z-50 flex w-full items-center bg-light-gray border-t border-medium-gray px-4",
        "fixed bottom-0 pb-5 justify-around",
        "md:top-0 md:bottom-auto md:border-t-0 md:border-b md:justify-start md:gap-2 md:px-6 md:pb-0",
      )}>
      <span className="hidden md:flex items-center gap-2 pr-10">
        <LogoIcon className="size-7" />
        <span className="font-bold text-black">Dating App</span>
      </span>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path
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
