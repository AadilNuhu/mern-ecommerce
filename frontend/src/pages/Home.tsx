import { FaCar,FaStar,FaCreditCard } from "react-icons/fa";
import FeaturedProducts from "./FeaturedProducts";
import '../App.css'
import { useAuth } from "../auth/auth";

const Home = () => {
  const {user} = useAuth()
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h3 className="text-gray-100 font-bold text-3xl">{user ? `Welcome back, ${user.username}` : `Hello User`}</h3>
        <h1 className="text-6xl font-extrabold mb-4 text-white">Shop the Latest Trends</h1>
        <p className="text-gray-100 text-lg max-w-xl mb-6">
          Discover exclusive deals on clothing, accessories, and lifestyle
          products. Get your favorites delivered right to your doorstep.
        </p>
        <div className="flex gap-4">
          <a
            href="/products"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Why shop with us */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Shop With Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We’re more than just an online store — we’re your go-to destination
            for quality, style, and convenience.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Free Shipping */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-4"><FaCar /></div>
              <h3 className="text-xl font-semibold mb-2">
                Fast & Free Shipping
              </h3>
              <p className="text-gray-600">
                Get your favorite products delivered quickly, at no extra cost.
              </p>
            </div>

            {/* Premium Quality */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-4"><FaStar /></div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                We carefully curate and test our products to meet the highest
                standards.
              </p>
            </div>

            {/* Secure Payments */}
            <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-4"><FaCreditCard /></div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Shop confidently with safe and encrypted transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* premium watch */}
      <div className="flex py-20 px-10 gap-10 flex-col md:flex-row">
        {/* Left Image */}
        <div className="w-full">
            <img src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
        </div>
        {/* Right Text */}
        <div className="w-full px-10">
            <h1 className="font-medium text-4xl mb-10">Premium Watch</h1>
            <p className="text-xl leading-10 mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque placeat labore amet impedit aliquam, sint reiciendis iste neque magnam inventore possimus dignissimos optio atque tempore quis ipsam quam accusamus. Consequatur voluptatibus reprehenderit vel. Fugit saepe dolorum et rerum sequi.</p>
            <p className="text-xl leading-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem cumque placeat labore amet impedit aliquam, sint reiciendis iste neque magnam inventore possimus dignissimos optio atque tempore quis ipsam quam accusamus. Consequatur voluptatibus reprehenderit vel. Fugit saepe dolorum et rerum sequi.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
