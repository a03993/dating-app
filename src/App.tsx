import { useState, useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"

import CarouselPage from "./pages/OnboardingPage"
import DiscoverPage from "./pages/DiscoverPage"
import MatchesPage from "./pages/MatchesPage"
import MessagesPage from "./pages/MessagesPage"
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
              path="/messages"
              element={<MessagesPage />}
            />
            <Route
              path="/profile"
              element={<ProfilePage user={currentUser} />}
            />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
