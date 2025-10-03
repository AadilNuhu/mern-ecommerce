import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    if (!email || !password) {
      setMessage("All fields required")
      setTimeout(() => setMessage(""), 3000)
      return
    }
    setLoading(true)
    if (email === "admin@gmail.com" && password === "admin123") {
      setMessage("Access Granted ...")
      setTimeout(() => {
        setLoading(false)
        setMessage("")
        navigate("/admin010/admin999")
      }, 2000)
    } else {
      setMessage("Invalid Credentials")
      setTimeout(() => {
        setLoading(false)
        setMessage("")
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-gray-100">
      <form
        className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md flex flex-col gap-4"
        onSubmit={onSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-2">Welcome Back Admin</h1>
        {message && (
          <div className={`text-center py-2 rounded-md font-medium ${message === "Access Granted ..." ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} transition-all`}>
            {message}
          </div>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Enter email"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter password"
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          autoComplete="current-password"
        />
        <button
          disabled={loading}
          className={`w-full py-3 rounded-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin