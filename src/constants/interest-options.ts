import CameraIcon from "../assets/icons/camera.svg?react"
import GameHandleIcon from "../assets/icons/game-handle.svg?react"
import GobletFullIcon from "../assets/icons/goblet-full.svg?react"
import MusicIcon from "../assets/icons/music.svg?react"
import NoodlesIcon from "../assets/icons/noodles.svg?react"
import OutdoorIcon from "../assets/icons/outdoor.svg?react"
import ParachuteIcon from "../assets/icons/parachute.svg?react"
import PersonRunningIcon from "../assets/icons/person-running.svg?react"
import PlatteIcon from "../assets/icons/platte.svg?react"
import RippleIcon from "../assets/icons/ripple.svg?react"
import ShopBagIcon from "../assets/icons/shop-bag.svg?react"
import TennisIcon from "../assets/icons/tennis.svg?react"
import VienchartsIcon from "../assets/icons/viencharts.svg?react"
import VoiceOutlineIcon from "../assets/icons/voice-outline.svg?react"

interface Interest {
  id:
    | "photography"
    | "shopping"
    | "karaoke"
    | "yoga"
    | "cooking"
    | "tennis"
    | "running"
    | "swimming"
    | "art"
    | "traveling"
    | "extreme"
    | "music"
    | "drinking"
    | "videoGames"
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export const interestOptions: Interest[] = [
  {
    id: "photography",
    label: "Photography",
    icon: CameraIcon,
  },
  {
    id: "shopping",
    label: "Shopping",
    icon: ShopBagIcon,
  },
  {
    id: "karaoke",
    label: "Karaoke",
    icon: VoiceOutlineIcon,
  },
  {
    id: "yoga",
    label: "Yoga",
    icon: VienchartsIcon,
  },
  {
    id: "cooking",
    label: "Cooking",
    icon: NoodlesIcon,
  },
  {
    id: "tennis",
    label: "Tennis",
    icon: TennisIcon,
  },
  {
    id: "running",
    label: "Running",
    icon: PersonRunningIcon,
  },
  {
    id: "swimming",
    label: "Swimming",
    icon: RippleIcon,
  },
  {
    id: "art",
    label: "Art",
    icon: PlatteIcon,
  },
  {
    id: "traveling",
    label: "Traveling",
    icon: OutdoorIcon,
  },
  {
    id: "extreme",
    label: "Extreme",
    icon: ParachuteIcon,
  },
  {
    id: "music",
    label: "Music",
    icon: MusicIcon,
  },
  {
    id: "drinking",
    label: "Drinking",
    icon: GobletFullIcon,
  },
  {
    id: "videoGames",
    label: "Video Games",
    icon: GameHandleIcon,
  },
]
