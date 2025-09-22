import { useState, useEffect } from "react"
import axios from "axios"

const ProductList = () => {
  const [products, setProducts] = useState([])
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
        <div className="" >
          {products.map((product) => (
            <div className="border border-gray-400 rounded-xl p-3 my-3" key={product._id}>
              <h3 className="font-medium">{product.productName}</h3>
              <p className="text-gray-500">{product.description}</p>
              <div className="flex justify-between items-center">
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default ProductList