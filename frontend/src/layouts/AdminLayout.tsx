// layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom"

export const AdminLayout = () => (
  <div className="flex min-h-screen">
    {/* AdminSidebar could go here */}
    <main className="flex-1 bg-gray-100 pt-6">
      <Outlet />
    </main>
  </div>
)