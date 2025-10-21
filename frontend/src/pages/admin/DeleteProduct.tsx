import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
const apiUrl = import.meta.env.VITE_API_URL;


type Product = {
  _id: string
  productName: string
  description?: string | null
  price?: string | number
  image?: string | null
}

const productImageUrl = (img?: string | null, apiBase?: string) => {
  if (!img) return "https://via.placeholder.com/400x300?text=No+Image"
  // if already absolute URL, return as-is
  if (/^https?:\/\//i.test(img)) return img
  const cleaned = img.replace(/^\/+/, "")
  const base = apiBase ?? "http://localhost:9000"
  return `${base}/${cleaned}`
}


const DeleteProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const deleteProduct = async () => {
      try {
        await axios.delete(`${apiUrl}/products/${id}`)
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