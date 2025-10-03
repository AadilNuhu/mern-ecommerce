import { BrowserRouter, Routes, Route } from "react-router-dom"
import { publicRoutes, adminRoutes, fallbackRoute } from "./routes"
import { MainLayout } from "./layouts/MainLayout"
import { AdminLayout } from "./layouts/AdminLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* 404 fallback */}
        <Route path={fallbackRoute.path} element={fallbackRoute.element} />
      </Routes>
    </BrowserRouter>
  )
}

export default App