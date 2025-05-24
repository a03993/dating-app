import type { Location } from "./location.type"

export interface User {
  id: string
  email: string
  password: string
  sms: string
  firstName: string
  lastName: string
  age: number
  gender: string
  profession: string
  location: Location
  about: string
  interests: string[]
  avatar: string
  gallery: string[]
}
