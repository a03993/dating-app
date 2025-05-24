import { createContext, useContext } from "react"
import type { User } from "@/types/user.types"

export const UserContext = createContext<User | null>(null)

export const useCurrentUser = () => useContext(UserContext)
