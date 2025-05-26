import { createContext, useContext, useEffect, useState } from "react"

import axios from "axios"

import type { User } from "@/types/user.types"

interface UserDataContextType {
  loggedInUser: User | null
  allUsers: User[]
  isLoading: boolean
}

const UserDataContext = createContext<UserDataContextType>({
  loggedInUser: null,
  allUsers: [],
  isLoading: true,
})

export const useUserData = () => useContext(UserDataContext)

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, usersRes] = await Promise.all([
          // 目前先以 user-1 模擬登入
          axios.get("http://localhost:4000/users/user-1"),
          axios.get("http://localhost:4000/users"),
        ])
        setLoggedInUser(userRes.data)
        setAllUsers(usersRes.data)
      } catch (err) {
        console.error("Failed to fetch user data", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return <UserDataContext.Provider value={{ loggedInUser, allUsers, isLoading }}>{children}</UserDataContext.Provider>
}
