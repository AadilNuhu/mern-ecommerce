import axios from 'axios'
import { useState } from 'react'
import {useAuth} from './auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {setUser} = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')  
        setError('')

        try {
            const res = await axios.post('http://localhost:9000/login', {
                email,
                password
            })
            const user = res.data?.user
            if (user) {
                setUser(user)
                setMessage("Login Successful")
                setTimeout(() => {
                    setMessage('')
                    navigate('/')
                }, 2000);
            } else {
                setError("Invalid server response")
            }

        } catch (error: any) {
            console.log(error);
            setError(error?.response?.data?.message)
            setTimeout(() => {
                setError('')
            }, 2000);
        }
    }

  return (
    <div className="flex justify-center items-center h-[100vh]">
        <form onSubmit={handleSubmit} className="shadow-2xl p-10 text-center rounded-md" action="">
            {(message || error) && (
              <div className="bg-gray-900/10 text-gray-900 p-2">{message || error}</div>
            )}
            <h1 className="text-3xl font-medium py-3">Welcome Back</h1>
            <input onChange={(e) => setEmail(e.target.value)} className="p-2 w-full border border-gray-400 rounded-md my-3" type="text" placeholder="Enter Email" />
            <input onChange={(e) => setPassword(e.target.value)} className="p-2 w-full border border-gray-400 rounded-md my-3" type="password" placeholder="Enter Password" />
            <button className="bg-gray-900 text-white cursor-pointer py-2 px-2 w-full rounded-md font-medium mt-2">Login</button>
            <p className="mt-2 text-lg">Don't have an Account? <a className="font-medium hover:underline" href="/signup">Signup</a></p>
        </form>
    </div>
  )
}

export default Login