import { ROUTES } from "@/constants/routes"
import { Navigate, Outlet } from "react-router-dom"

import { Navbar } from "@/components/Navbar"

import { UserDataProvider, useUserData } from "@/contexts/UserDataContext"

export default function AppLayout() {
  return (
    <UserDataProvider>
      <AppContent />
    </UserDataProvider>
  )
}

function AppContent() {
  const { loggedInUser, isLoading } = useUserData()

  if (isLoading) return null // todo: LoadingSpinner

  if (!loggedInUser)
    return (
      <Navigate
        to={ROUTES.HOME}
        replace
      />
    )

  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  )
}
