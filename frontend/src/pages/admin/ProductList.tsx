import { useState, useEffect } from "react"
import axios from "axios"

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
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default ProductList