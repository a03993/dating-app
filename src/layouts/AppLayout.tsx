import { Outlet } from "react-router-dom"

import { Navbar } from "@/components/Navbar"

import { UserDataProvider } from "@/contexts/UserDataContext"

export default function AppLayout() {
  return (
    <UserDataProvider>
      <main>
        <Navbar />
        <Outlet />
      </main>
    </UserDataProvider>
  )
}
