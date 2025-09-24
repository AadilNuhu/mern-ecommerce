import { useState, useEffect } from "react"
import axios from "axios"

const productImageUrl = (img?: string | null) =>
  img ? `http://localhost:9000/${img.replace(/^\/+/, "")}` : "https://via.placeholder.com/800x450?text=No+Image"

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get("http://localhost:9000/products")
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(`Error fetching products ${err}`);
        setError("Failed to load products")
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Loading Products</p>
  if (error) return <p>{error}</p>
  return (
    <div>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between px-10">
          <h1 className="font-medium text-3xl text-center py-7">All Products</h1>
          <a href="/admin010/admin999" className="font-medium">Dashboard</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
          {products.map((product) => (
            <div className="border border-gray-400 rounded-xl p-3 my-3" key={product._id}>
              <img src={productImageUrl(product.image)} alt={product.productName || 'product'} className="w-56 h-56 object-cover rounded-md" />
              <div>
                <h3 className="font-medium">{product.productName}</h3>
              <p className="text-gray-500">{product.description}</p>
              <div className="flex justify-between items-center">
                <p>{product.price}</p>
              </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default ProductList