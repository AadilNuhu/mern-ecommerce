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
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            className="border border-gray-400 rounded-xl p-3 my-3 shadow-sm animate-fade-in"
            key={product._id}
          >
            <img
              src={productImageUrl(product.image)}
              alt={product.productName || "product"}
              className="w-56 h-56 object-cover rounded-md mx-auto"
            />

            {editingId === product._id ? (
              <div className="mt-3">
                <input
                  type="text"
                  name="productName"
                  value={editData.productName}
                  onChange={handleChange}
                  className="border p-1 w-full mb-2 rounded"
                  placeholder="Product Name"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="border p-1 w-full mb-2 rounded"
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                  className="border p-1 w-full mb-2 rounded"
                  placeholder="Price"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleUpdate(product._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <h3 className="font-medium text-lg">{product.productName}</h3>
                <p className="text-gray-500 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(product._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
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
      )}
    </div>
  )
}

export default ProductList  