import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "../auth/auth" // ⬅️ adjust the path if needed

type Product = {
  _id: string
  productName: string
  description?: string | null
  price?: string | number
  image?: string | null
}

// Helper: Build image URL or placeholder
const productImageUrl = (img?: string | null) =>
  img
    ? `http://localhost:9000/${img.replace(/^\/+/, "")}`
    : "https://via.placeholder.com/400x300?text=No+Image"

// Helper: Truncate text
const previewText = (text = "", wordLimit = 10) => {
  const words = text.trim().split(/\s+/)
  const isTruncated = words.length > wordLimit
  return {
    preview: isTruncated ? words.slice(0, wordLimit).join(" ") + "..." : text,
    isTruncated,
  }
}

const Products = () => {
  const { user } = useAuth()  // Get current logged-in user
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  // Popup state
  const [popupVisible, setPopupVisible] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>("http://localhost:9000/products")
        setProducts(data ?? [])
      } catch (err) {
        console.error("Error fetching products", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const toggleDescription = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  // Handle add to cart with userId
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      setPopupMessage("Please log in to add items to your cart.")
      setPopupVisible(true)
      return
    }

    try {
      await axios.post("http://localhost:9000/carts", {
        userId: user.id,
        productId,
      })
      setPopupMessage("Product added to your cart.")
      setPopupVisible(true)
      setTimeout(() => setPopupVisible(false), 2000)
    } catch (err) {
      console.error("Error adding to cart", err)
      setPopupMessage("Failed to add product to cart.")
      setPopupVisible(true)
      setTimeout(() => setPopupVisible(false), 2000)
    }
  }

  if (loading) return <p>Loading products…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="px-5 pb-5">
      <h1 className="font-medium text-3xl text-center py-7">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const desc = product.description ?? ""
          const { preview, isTruncated } = previewText(desc, 10)
          const isOpen = expanded[product._id] ?? false

          return (
            <div key={product._id} className="border rounded-xl p-4 shadow-sm">
              <img
                src={productImageUrl(product.image)}
                alt={product.productName || "Product"}
                className="w-full h-56 object-contain rounded-md mb-3"
              />

              <h3 className="font-medium text-lg mb-2">{product.productName}</h3>

              <p className="text-gray-500 py-2">
                {isOpen || !isTruncated ? desc : preview}{" "}
                {isTruncated && (
                  <button
                    onClick={() => toggleDescription(product._id)}
                    className="text-indigo-600 ml-1"
                  >
                    {isOpen ? "Show less" : "Show more"}
                  </button>
                )}
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-green-600 font-semibold">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="bg-gray-900 text-white px-3 py-1 rounded-md hover:bg-gray-800 transition"
                >
                  Add to cart
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
            <p className="text-lg text-gray-800">{popupMessage}</p>
            <button
              onClick={() => setPopupVisible(false)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products 