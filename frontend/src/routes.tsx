// routes.tsx
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import { NotFound } from "./pages/NotFound"
import AdminLogin from "./pages/admin/AdminLogin"

// Admin
import Dashboard from "./pages/admin/Dashboard"
import { OrderList } from "./pages/admin/OrderList"
import ProductList from "./pages/admin/ProductList"
import UserList from "./pages/admin/UserList"
import CreateProduct from "./pages/admin/CreateProduct"

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/products", element: <Products /> },
  { path: "/contact", element: <Contact /> },
  { path: "/cart", element: <Cart /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]

export const adminBase = "/admin010/admin999"

export const adminRoutes = [
  { path: `${adminBase}`, element: <Dashboard /> },
  { path: `${adminBase}/createProduct`, element: <CreateProduct /> },
  { path: `${adminBase}/orderList`, element: <OrderList /> },
  { path: `${adminBase}/productList`, element: <ProductList /> },
  { path: `${adminBase}/userList`, element: <UserList /> },
  { path: `${adminBase}/adminLogin`, element: <AdminLogin /> },
]

export const fallbackRoute = { path: "*", element: <NotFound /> }