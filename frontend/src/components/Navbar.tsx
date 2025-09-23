import { useState } from "react";
import { useAuth } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const logout = () => {
    setUser(null)
    navigate("/")
  }

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="text-2xl font-bold  text-gray-600">Ecommerce</div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                About
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Product
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Contact
              </a>
            </div>

            {/* login and signup or logout */}
            {
              isAuthenticated ?
                <div className="hidden md:flex items-center gap-3">
                  <div>Hello, {user?.username}</div>
                  <a href="/cart" className="flex items-center px-3 hover:text-blue-400"><FiShoppingCart className="cursor-pointer hover:text-blue-400" /><div className="pl-1 pt-2">0</div></a>
                  <button onClick={logout} className="bg-red-500 hover:bg-red-700 cursor-pointer p-2 rounded-md text-white font-medium">Logout</button>
                </div>
                :
                <div className="lg:gap-2 lg:flex md:flex md:gap-2 hidden">
                  <a className="bg-gray-900 px-4 hover:bg-gray-900/70 py-2 rounded-md text-white font-medium" href="/login">Login</a>
                  <a className="bg-gray-900 px-4 hover:bg-gray-900/70 py-2 rounded-md text-white font-medium" href="/signup">Signup</a>
                </div>
            }

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Open menu"
              >
                {/* Hamburger icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black/10 bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sliding menu */}
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center px-4 py-4 border-b">
              <div className="text-xl font-bold text-blue-600"></div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                {/* Close icon */}
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col mt-4 space-y-4 px-4">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="/products"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Product
              </a>
              <a
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              {isAuthenticated ?
                <div>
                  <a href="/cart" className="flex items-center px-3 hover:text-blue-400"><FiShoppingCart className="cursor-pointer hover:text-blue-400" /><div className="pl-1 pt-2">0</div></a>
                  <div className="flex items-center gap-3">
                    <div>Hello, {user?.username}</div>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-700 cursor-pointer p-2 rounded-md text-white font-medium">Logout</button>
                  </div>
                </div> :
                <div className="flex gap-2">
                  <a className="bg-gray-900 px-4 hover:bg-gray-900/70 py-2 rounded-md text-white font-medium" href="/login">Login</a>
                  <a className="bg-gray-900 px-4 hover:bg-gray-900/70 py-2 rounded-md text-white font-medium" href="/signup">Signup</a>
                </div>}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;