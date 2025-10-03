import { useState, useEffect } from "react"
import axios from "axios"

type Product = {
  _id: string
  productName: string
  description?: string | null
  price?: number | string
  image?: string | null
}

const productImageUrl = (img?: string | null) =>
  img ? `http://localhost:9000/${img.replace(/^\/+/, "")}` : "https://via.placeholder.com/800x450?text=No+Image"

const ProductList = () => {
  interface Product {
    _id: string;
    productName: string;
    description: string;
    price: number;
    image?: string; // optional if some products may not have images
  }
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ productName: "", description: "", price: "" })
  const [feedback, setFeedback] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null) // for delete modal

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9000/products")
      setProducts(res.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching products", err)
      setError("Failed to load products")
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await axios.delete(`http://localhost:9000/products/${deleteId}`)
      setProducts(products.filter(p => p._id !== deleteId))
      setFeedback("Product deleted successfully")
    } catch (err) {
      console.error("Delete failed", err)
      setFeedback("Failed to delete product")
    } finally {
      setDeleteId(null)
      setTimeout(() => setFeedback(""), 2500)
    }
  }

  const startEdit = (product: Product) => {
    setEditingId(product._id)
    setEditData({
      productName: product.productName,
      description: product.description || "",
      price: String(product.price ?? ""),
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (id: string) => {
    try {
      await axios.put(`http://localhost:9000/products/${id}`, editData)
      setFeedback("Product updated successfully")
      setEditingId(null)
      fetchProducts()
    } catch (err) {
      console.error("Update failed", err)
      setFeedback("Failed to update product")
    } finally {
      setTimeout(() => setFeedback(""), 2500)
    }
  }

  if (loading) return <p>Loading Products…</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="px-5 pb-5">
      <div className="flex items-center justify-between px-10">
        <h1 className="font-medium text-3xl text-center py-7">All Products</h1>
        <a href="/admin010/admin999" className="font-medium">Dashboard</a>
      </div>

      {feedback && (
        <div className="text-center mb-4">
          <span className="bg-gray-800 text-white px-4 py-2 rounded-md inline-block">{feedback}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={productImageUrl(product.image)}
                  alt={product.productName || "product"}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Content */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.productName}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-xl font-bold text-indigo-600">{product.price}</p>

                {/* Actions */}
                <div className="mt-4 flex justify-between">
                  <a
                    href={`/admin010/admin999/${product._id}/edit`}
                    className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Edit
                  </a>
                  <a
                    href={`/admin010/admin999/${product._id}/delete`}
                    className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full animate-fade-in">
            <h2 className="text-lg font-semibold mb-2">Delete Product</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList  