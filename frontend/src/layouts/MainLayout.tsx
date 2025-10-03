// layouts/MainLayout.tsx
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

export const MainLayout = () => (
  <>
    <Navbar />
    <main className="pt-15">
      <Outlet />
    </main>
    <Footer />
  </>
)