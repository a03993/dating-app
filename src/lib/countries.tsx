import CanadaIcon from "@/assets/flags/Canada.svg?react"
import JapanIcon from "@/assets/flags/Japan.svg?react"
import MalaysiaIcon from "@/assets/flags/Malaysia.svg?react"
import PhilippinesIcon from "@/assets/flags/Philippines.svg?react"
import RussiaIcon from "@/assets/flags/Russia.svg?react"
import SingaporeIcon from "@/assets/flags/Singapore.svg?react"
import SouthKoreaIcon from "@/assets/flags/SouthKorea.svg?react"
import TaiwanIcon from "@/assets/flags/Taiwan.svg?react"
import ThailandIcon from "@/assets/flags/Thailand.svg?react"
import UnitedStatesIcon from "@/assets/flags/UnitedStates.svg?react"

export const countries = [
  { key: "us", code: "+1", label: <UnitedStatesIcon className="size-4" />, name: "United States" },
  { key: "ca", code: "+1", label: <CanadaIcon className="size-4" />, name: "Canada" },
  { key: "my", code: "+60", label: <MalaysiaIcon className="size-4" />, name: "Malaysia" },
  { key: "ph", code: "+63", label: <PhilippinesIcon className="size-4" />, name: "Philippines" },
  { key: "sg", code: "+65", label: <SingaporeIcon className="size-4" />, name: "Singapore" },
  { key: "th", code: "+66", label: <ThailandIcon className="size-4" />, name: "Thailand" },
  { key: "ru", code: "+7", label: <RussiaIcon className="size-4" />, name: "Russia" },
  { key: "jp", code: "+81", label: <JapanIcon className="size-4" />, name: "Japan" },
  { key: "kr", code: "+82", label: <SouthKoreaIcon className="size-4" />, name: "South Korea" },
  { key: "tw", code: "+886", label: <TaiwanIcon className="size-4" />, name: "Taiwan" },
]
