import Landing from './pages/Landing'
import { Routes, Route } from "react-router-dom"
import { Error, Register } from "./pages"
import { AddJob, AllJobs, Profile, SharedLayout, Stats } from './pages/Dashboard'
import { RequiresAuth } from './components'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />
      }>
        <Route path="stats" element={<Stats />} />
        <Route path="all-jobs" element={<AllJobs />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default App
