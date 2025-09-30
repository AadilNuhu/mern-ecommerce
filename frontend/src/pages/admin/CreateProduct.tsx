import { useState } from "react"
import axios from "axios"
import { AxiosError } from 'axios'
import { useNavigate } from "react-router-dom"

const CreateProduct = () => {
    const navigate = useNavigate()
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [message, setMessage] = useState('')

    const onsubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // Build multipart form data
            const form = new FormData()
            form.append('productName', productName)
            form.append('description', description)
            form.append('price', price)
            if (image) form.append('image', image)

            await axios.post("http://localhost:9000/products", form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setMessage("Product Created Successfully")
            setTimeout(() => {
                setMessage("")
                navigate('/admin010/admin999')
            }, 2000);

        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;
            setMessage(err.response?.data?.message || "Something went wrong");

            setTimeout(() => setMessage(""), 3000);
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
                            <label htmlFor="imageUpload" className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block">
                                Upload Image
                                <input type="file" accept="image/*" name="image" id="imageUpload" onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null
                                    // revoke previous url
                                    if (previewUrl) URL.revokeObjectURL(previewUrl)
                                    setImage(file)
                                    setPreviewUrl(file ? URL.createObjectURL(file) : null)
                                }} className="hidden" />
                            </label>

                            {/* preview */}
                            {previewUrl && (
                                <div className="mt-3 flex items-center gap-3">
                                    <img src={previewUrl} alt="preview" className="w-20 h-20 object-cover rounded-md border border-gray-200 shadow-sm" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{image?.name}</span>
                                        <button type="button" onClick={() => {
                                            // clear preview and file
                                            if (previewUrl) URL.revokeObjectURL(previewUrl)
                                            setPreviewUrl(null)
                                            setImage(null)
                                            // also reset input value for same-file reselect
                                            const input = document.getElementById('imageUpload') as HTMLInputElement | null
                                            if (input) input.value = ''
                                        }} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                                    </div>
                                </div>
                            )}

                    <button className="w-full p-2 my-3 bg-gray-900 rounded-md text-white font-medium cursor-pointer hover:bg-gray-600">Submit</button>
                    <a href="/admin010/admin999" className="text-blue-400">Dashboard</a>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct