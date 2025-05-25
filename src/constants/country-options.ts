import CanadaIcon from "../assets/flags/Canada.svg?react"
import JapanIcon from "../assets/flags/Japan.svg?react"
import MalaysiaIcon from "../assets/flags/Malaysia.svg?react"
import PhilippinesIcon from "../assets/flags/Philippines.svg?react"
import RussiaIcon from "../assets/flags/Russia.svg?react"
import SingaporeIcon from "../assets/flags/Singapore.svg?react"
import SouthKoreaIcon from "../assets/flags/SouthKorea.svg?react"
import TaiwanIcon from "../assets/flags/Taiwan.svg?react"
import ThailandIcon from "../assets/flags/Thailand.svg?react"
import UnitedStatesIcon from "../assets/flags/UnitedStates.svg?react"

interface CountryOption {
  key: string
  code: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
}

export const countryOptions: CountryOption[] = [
  { key: "us", code: "+1", icon: UnitedStatesIcon, label: "United States" },
  { key: "ca", code: "+1", icon: CanadaIcon, label: "Canada" },
  { key: "my", code: "+60", icon: MalaysiaIcon, label: "Malaysia" },
  { key: "ph", code: "+63", icon: PhilippinesIcon, label: "Philippines" },
  { key: "sg", code: "+65", icon: SingaporeIcon, label: "Singapore" },
  { key: "th", code: "+66", icon: ThailandIcon, label: "Thailand" },
  { key: "ru", code: "+7", icon: RussiaIcon, label: "Russia" },
  { key: "jp", code: "+81", icon: JapanIcon, label: "Japan" },
  { key: "kr", code: "+82", icon: SouthKoreaIcon, label: "South Korea" },
  { key: "tw", code: "+886", icon: TaiwanIcon, label: "Taiwan" },
]
