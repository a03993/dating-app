import { useEffect, useState } from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { UserContext } from "@/contexts/UserContext"

import AppLayout from "./layouts/AppLayout"
import DiscoverPage from "./pages/DiscoverPage"
import MatchesPage from "./pages/MatchesPage"
import MessagesPage from "./pages/MessagesPage"
import CarouselPage from "./pages/OnboardingPage"
import ProfilePage from "./pages/ProfilePage"
import type { User } from "./types/user.types"

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    // 目前先以 user-4 模擬登入
    fetch("http://localhost:4000/users/user-4")
      .then((res) => res.json())
      .then(setCurrentUser)
  }, [])

  return (
    <UserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Routes>
          {/* Home page, not include Navbar */}
          <Route
            path="/"
            element={<CarouselPage />}
          />

          {/* Other pages share Navbar */}
          {currentUser && (
            <Route element={<AppLayout />}>
              <Route
                path="/discover"
                element={<DiscoverPage />}
              />
              <Route
                path="/matches"
                element={<MatchesPage />}
              />
              <Route
                path="/matches/profile/:userId"
                element={<ProfilePage />}
              />
              <Route
                path="/messages"
                element={<MessagesPage />}
              />
              <Route
                path="/messages/profile/:userId"
                element={<ProfilePage />}
              />
              <Route
                path="/profile/:userId"
                element={<ProfilePage />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
