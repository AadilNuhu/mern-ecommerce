import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [message, setMessage] = useState('')
    const onsubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:9000/products", {
                productName,
                description,
                price
            })
            setMessage("Product Created Successfully")
            setTimeout(() => {
                setMessage("")
                navigate('/admin010/admin999')
            }, 3000);

        } catch (error) {
            console.log(error);
            setMessage(error?.response?.data?.message)
            setTimeout(() => {
                setMessage("")
            }, 3000);
        }
    }
    return (
        <div className="flex justify-center items-center h-[90vh]">
            <div className="text-center p-10 shadow-2xl rounded-md w-[550px]">
            <h1 className="text-3xl font-medium py-2">Create Product</h1>
                <form className="" action="" onSubmit={onsubmit}>
                    {(message) && (
                        <p className="bg-gray-400/10 p-2 text-gray-400 rounded-md mb-2">{message}</p>
                    )}
                    <input className="w-full p-2 my-2 border border-gray-400 rounded-md outline-blue-300" onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Enter product name" />
                    <input className="w-full p-2 my-2 border border-gray-400 rounded-md outline-blue-300" onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter product description" />
                    <input className="w-full p-2 my-2 border border-gray-400 rounded-md outline-blue-300" onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter product price" />
                    <button className="w-full p-2 my-3 bg-gray-900 rounded-md text-white font-medium cursor-pointer hover:bg-gray-600">Submit</button>
                    <a href="/admin010/admin999" className="text-blue-400">Dashboard</a>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct