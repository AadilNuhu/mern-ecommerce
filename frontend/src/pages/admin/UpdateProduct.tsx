import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Fetch product details on mount
  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        const product = res.data;
        setProductName(product.productName);
        setDescription(product.description);
        setPrice(product.price);
        if (product.image) {
          setPreviewUrl(`http://localhost:9000/${product.image}`);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (previewUrl) URL.revokeObjectURL(previewUrl); // cleanup old preview
    setImage(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const form = new FormData();
    form.append("productName", productName);
    form.append("description", description);
    form.append("price", price);
    if (image) form.append("image", image);

    try {
      await axios.put(`http://localhost:9000/products/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Product updated successfully!");
      setTimeout(() => {
        setMessage("");
        navigate("/admin010/admin999/productList");
      }, 2000);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setMessage(err.response?.data?.message || "Failed to update product");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="text-center p-10 shadow-2xl rounded-2xl w-[550px] bg-white">
        <h1 className="text-3xl font-medium py-2">Update Product</h1>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {message && (
            <p className="bg-gray-400/10 p-2 text-gray-600 rounded-md mb-2">
              {message}
            </p>
          )}

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full p-2 border border-gray-400 rounded-md outline-blue-300"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full p-2 border border-gray-400 rounded-md outline-blue-300"
          />

          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full p-2 border border-gray-400 rounded-md outline-blue-300"
          />

          <label
            htmlFor="imageUpload"
            className="cursor-pointer rounded-lg border border-blue-400 px-4 py-2 text-blue-400 font-medium hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-block"
          >
            Upload New Image
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-3 flex items-center gap-3">
              <img
                src={previewUrl}
                alt="preview"
                className="w-30 h-20 object-cover rounded-md border border-gray-200 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{image?.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(null);
                    setImage(null);
                    const input = document.getElementById(
                      "imageUpload"
                    ) as HTMLInputElement | null;
                    if (input) input.value = "";
                  }}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-2 my-3 bg-gray-900 rounded-md text-white font-medium cursor-pointer hover:bg-gray-600"
          >
            Save Changes
          </button>

          <a href="/admin010/admin999" className="text-blue-400">
            Back to Dashboard
          </a>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;