import { useState, useEffect } from "react"
import axios from "axios"

type Product = {
  _id: string
  productName: string
  description?: string | null
  price?: string | number
  image?: string | null
}

const productImageUrl = (img?: string | null) =>
  img ? `http://localhost:9000/${img.replace(/^\/+/, "")}` : "https://via.placeholder.com/400x300?text=No+Image"

function previewText(text = "", wordLimit = 10) {
  const words = text.trim().split(/\s+/)
  if (words.length <= wordLimit) return { preview: text, isTruncated: false }
  return { preview: words.slice(0, wordLimit).join(" ") + "...", isTruncated: true }
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true
    axios
      .get<Product[]>("http://localhost:9000/products")
      .then((res) => {
        if (!mounted) return
        setProducts(res.data ?? [])
      })
      .catch((err) => {
        console.error("Error fetching products", err)
        if (!mounted) return
        setError("Failed to load products")
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [])

  const toggle = (id: string) => setExpanded((s) => ({ ...s, [id]: !s[id] }))

  if (loading) return <p>Loading products…</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <div className="px-5 pb-5">
        <h1 className="font-medium text-3xl text-center py-7">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => {
            const desc = product.description ?? ""
            const { preview, isTruncated } = previewText(desc, 10)
            const isOpen = !!expanded[product._id]

            return (
              <div className="border border-gray-300 rounded-xl p-4 shadow-sm" key={product._id}>
                <img
                  src={productImageUrl(product.image)}
                  alt={product.productName || "product"}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="font-medium text-lg mb-2">{product.productName}</h3>
                <p className="text-gray-500 py-2">
                  {isOpen || !isTruncated ? desc : preview}{' '}
                  {isTruncated && (
                    <button onClick={() => toggle(product._id)} className="text-indigo-600 ml-1">
                      {isOpen ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-green-600 font-semibold">{product.price}</p>
                  <button className="bg-gray-900 text-white px-3 py-1 rounded-md">Add to cart</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Products