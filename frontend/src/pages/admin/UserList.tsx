import { useState, useEffect } from "react"
import axios from "axios"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    axios.get("http://localhost:9000/signup")
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      }).catch(err => {
        console.log(`Error fetching products ${err}`);
        setError("Failed to load products")
        setLoading(false)
      })
  })
  return (
    <div>
      <div className="flex justify-between px-20 py-10">
        <h1>UserList</h1>
        <a href="/admin010/admin999" className="font-medium">Dashboard</a>
      </div>

      <div>
        <table>
          <tr>
            <td className="w-full">Username</td>
            <td className="w-full">email</td>
            <td className="w-full">password</td>
          </tr>
          {users.map(user => (
            <div className="flex justify-between border border-gray-400 rounded-xl p-3 my-3" key={user._id}>
              <tr>
                <td className="w-full">{user.username}</td>
                <td className="w-full">{user.email}</td>
                <td className="w-full">{user.createdAt}</td>
              </tr>
            </div>
          ))}
        </table>
      </div>
    </div>
  )
}

export default UserList