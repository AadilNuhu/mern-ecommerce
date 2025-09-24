import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const DeleteProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const deleteProduct = async () => {
      try {
        await axios.delete(`http://localhost:9000/products/${id}`)
        // After successful delete, navigate back to product list
        navigate("/admin010/admin999/productList")
      } catch (err) {
        console.error(err)
        setError("Failed to delete product")
      } finally {
        setLoading(false)
      }
    }

    deleteProduct()
  }, [id, navigate])

  if (loading) return <p>Deleting product...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Product Deleted</h1>
    </div>
  )
}

export default DeleteProduct