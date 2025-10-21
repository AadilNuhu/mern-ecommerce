import { useState, useEffect } from "react"
import axios from "axios"

type User = {
  _id: string
  username: string
  email: string
  createdAt?: string
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  function getErrorMessage(err: unknown) {
    if (axios.isAxiosError(err)) {
      return (err.response?.data)?.message || err.message || "Failed to load users"
    }
    if (err instanceof Error) return err.message
    return String(err) || "Failed to load users"
  }

  useEffect(() => {
    let mounted = true

    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("http://localhost:5000/signup")
        if (!mounted) return
        setUsers(res.data ?? [])
      } catch (err: unknown) {
        if (!mounted) return
        console.error(err)
        setError(getErrorMessage(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchUsers()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">User List</h1>
          <a href="/admin010/admin999" className="underline">Dashboard</a>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Username</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-800">{user.username}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList
