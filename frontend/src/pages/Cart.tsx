import { useEffect, useState } from "react"
import axios from "axios"
import { FaCartShopping } from "react-icons/fa6"
import { useAuth } from "../auth/auth"

type CartItem = {
  _id: string
  productId: {
    _id: string
    productName: string
    price: number
    image?: string | null
  }
  quantity: number
}

const Cart = () => {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  useEffect(() => {
    if (!user) return
    const fetchCart = async () => {
      try {
        const { data } = await axios.get<CartItem[]>(`http://localhost:9000/carts/${user.id}`)
        setCartItems(data)
      } catch (err) {
        console.error("Error fetching cart", err)
        setError("Failed to load cart")
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [user])

  const handleRemoveItem = async (itemId: string) => {
    if (!user) return
    try {
      await axios.delete(`http://localhost:9000/carts/${user.id}/${itemId}`)
      setCartItems((prev) => prev.filter((item) => item._id !== itemId))
    } catch (err) {
      console.error("Error removing item", err)
      alert("Failed to remove item")
    }
  }

  const handleClearCart = async () => {
    if (!user) return
    try {
      await axios.delete(`http://localhost:9000/carts/${user.id}`)
      setCartItems([])
      setShowConfirmModal(false)
    } catch (err) {
      console.error("Error clearing cart", err)
      alert("Failed to clear cart")
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    )
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg">Please log in to view your cart.</p>
      </div>
    )
  }

  if (loading) return <p className="p-6">Loading cart…</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="p-6">
      <h1 className="flex items-center gap-3 text-3xl font-medium mb-6">
        <FaCartShopping /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border rounded-lg p-3 shadow-sm animate-fade-in"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      item.productId?.image
                        ? `http://localhost:9000/${item.productId.image.replace(/^\/+/, "")}`
                        : "https://via.placeholder.com/80x80?text=No+Image"
                    }
                    alt={item.productId?.productName || "Product"}
                    className="w-20 h-20 object-contain rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.productId?.productName}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ${item.productId?.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="font-semibold">
                    ${(item.productId?.price || 0) * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <div className="space-x-3">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Clear Cart
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Confirm Clear Cart Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center animate-fade-in">
            <h2 className="text-lg font-medium mb-3">Clear Cart</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to clear all items from your cart?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Yes, Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart