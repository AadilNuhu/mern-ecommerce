import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error,setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')
        setError('')
        try {
            await axios.post('http://localhost:3000/signup', {
                username,
                email,
                password
            })

            // show message immediately, then navigate after 2 seconds
            setMessage("Account Created Successfully")
            setTimeout(() => {
                setMessage('')
                navigate('/login')
            }, 2000);
        } catch (err) {
            console.log(err);
            const serverMsg =  "Couldn't Create Account"
            setError(serverMsg)
            setTimeout(() => {
                setError('')
            }, 3000);
        }

    }
    return (
        <div className="flex justify-center items-center h-[100vh]">
            <form onSubmit={handleSubmit} className="shadow-2xl p-10 text-center rounded-md w-[600px]">
                {/* only render the message container when there is a message or error */}
                {(message || error) && (
                  <div className="bg-gray-900/10 text-gray-900 p-2">{message || error}</div>
                )}
                <h1 className="text-3xl font-medium py-3">Create An Account</h1>
                <input onChange={(e) => setUsername(e.target.value)} className="p-2 w-full border border-gray-400 rounded-md my-3" required type="text" placeholder="Enter Username" />
                <input onChange={(e) => setEmail(e.target.value)} className="p-2 w-full border border-gray-400 rounded-md my-3" required type="email" placeholder="Enter Email" />
                <input onChange={(e) => setPassword(e.target.value)} className="p-2 w-full border border-gray-400 rounded-md my-3" required type="password" placeholder="Enter Password" />
                <button type="submit" className="bg-gray-900 text-white cursor-pointer py-2 px-4 w-full rounded-md font-medium mt-2">Signup</button>
                <p className="mt-2 text-lg">Already a member? <a className="font-medium hover:underline" href="/login">Login</a></p>
            </form>
        </div>
    )
}

export default Signup