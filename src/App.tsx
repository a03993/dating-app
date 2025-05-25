import { useEffect, useState } from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { UserContext } from "@/contexts/UserContext"

import { DEFAULT_FILTER_OPTIONS } from "./constants/filter-options"
import AppLayout from "./layouts/AppLayout"
import DiscoverPage from "./pages/DiscoverPage"
import MatchesPage from "./pages/MatchesPage"
import MessagesPage from "./pages/MessagesPage"
import CarouselPage from "./pages/OnboardingPage"
import ProfilePage from "./pages/ProfilePage"
import type { User } from "./types/user.types"

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [filterForm, setFilterForm] = useState(DEFAULT_FILTER_OPTIONS)

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
                element={
                  <DiscoverPage
                    filterForm={filterForm}
                    setFilterForm={setFilterForm}
                  />
                }
              />
              <Route
                path="/matches"
                element={<MatchesPage />}
              />
              <Route
                path="/messages"
                element={<MessagesPage />}
              />
              <Route
                path="/profile/:userId"
                element={<ProfilePage filterForm={filterForm} />}
              />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
