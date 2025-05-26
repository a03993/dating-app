import { useState } from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { DEFAULT_FILTER_OPTIONS } from "./constants/filter-options"
import { ROUTES } from "./constants/routes"
import AppLayout from "./layouts/AppLayout"
import DiscoverPage from "./pages/DiscoverPage"
import MatchesPage from "./pages/MatchesPage"
import MessagesPage from "./pages/MessagesPage"
import CarouselPage from "./pages/OnboardingPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  const [filterForm, setFilterForm] = useState(DEFAULT_FILTER_OPTIONS)

  return (
    <BrowserRouter>
      <Routes>
        {/* Home page, not include Navbar */}
        <Route
          path={ROUTES.HOME}
          element={<CarouselPage />}
        />

        {/* Other pages share Navbar */}
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.DISCOVER}
            element={
              <DiscoverPage
                filterForm={filterForm}
                setFilterForm={setFilterForm}
              />
            }
          />
          <Route
            path={ROUTES.MATCHES}
            element={<MatchesPage />}
          />
          <Route
            path={ROUTES.MESSAGES}
            element={<MessagesPage />}
          />
          <Route
            path={ROUTES.PROFILE()}
            element={<ProfilePage filterForm={filterForm} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
