interface Location {
  city: string
  country: string
  latitude: number
  longitude: number
}

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

export type UserProfile = Pick<
  User,
  "firstName" | "lastName" | "age" | "profession" | "location" | "about" | "interests" | "avatar" | "gallery"
>

export type ChatUser = Pick<User, "id" | "firstName" | "lastName" | "avatar">

export type LikedUser = Pick<User, "id" | "firstName" | "lastName" | "age" | "avatar">
