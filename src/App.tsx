import { BrowserRouter, Route, Routes } from "react-router-dom"

import AppLayout from "./layouts/AppLayout"

import CarouselPage from "./pages/CarouselPage"
import DiscoverPage from "./pages/DiscoverPage"
import MatchesPage from "./pages/MatchesPage"
import MessagesPage from "./pages/MessagesPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page, not include Navbar */}
        <Route
          path="/"
          element={<CarouselPage />}
        />

        {/* Other pages share Navbar */}
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
            element={<ProfilePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
