const FeaturedProducts = () => {
  const FeaturedProducts = [
    {
      id: 1,
      title: "watch1",
      discription: "description1",
      img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 100,
    },
    {
      id: 2,
      title: "watch2",
      discription: "description2",
      img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 200,
    },
    {
      id: 3,
      title: "watch3",
      discription: "description3",
      img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 300,
    },
    {
      id: 4,
      title: "watch4",
      discription: "description4",
      img: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
      price: 400,
    },
  ];
  return (
    <div className="p-10 pb-20">
      <h1 className="text-4xl font-bold text-center my-8">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {FeaturedProducts.map((product, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.discription}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price}</span>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
