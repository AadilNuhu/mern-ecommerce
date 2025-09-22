import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Products from "./pages/Products";
import { NotFound } from "./pages/NotFound";
import Login from './auth/Login'
import Signup from './auth/Signup'
// Admin
import Dashboard from "./pages/admin/Dashboard";
import { OrderList } from "./pages/admin/OrderList";
import ProductList from "./pages/admin/ProductList";
import UserList from "./pages/admin/UserList";
import CreateProduct from "./pages/admin/CreateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/admin010/admin999" element={<Dashboard />} />
          <Route path="/admin010/admin999/createProduct" element={<CreateProduct />} />
          <Route path="/admin010/admin999/orderList" element={<OrderList />} />
          <Route path="/admin010/admin999/productList" element={<ProductList />} />
          <Route path="/admin010/admin999/userList" element={<UserList />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
