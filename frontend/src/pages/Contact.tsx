import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gradient-to-br from-black via-gray-900 to-black p-6 text-white">
      <div className="w-full max-w-6xl bg-black border border-gray-800 shadow-2xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side - Info */}
        <div className="flex flex-col justify-center bg-gradient-to-b from-gray-900 to-black p-10 space-y-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-wide border-b border-gray-700 pb-4">
            Contact Us
          </h1>
          <p className="text-gray-400">
            Got a question, idea, or project? We’d love to hear from you. Reach out through the form or connect with us directly.
          </p>

          {/* Contact Details */}
          <div className="space-y-5 text-gray-300">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-xl text-white" />
              <span>+233 (245) 829-714</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-xl text-white" />
              <span>ecommerce@ecommerce.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-xl text-white" />
              <span>Accra, Ghana</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex space-x-6 pt-4">
            <a href="#" className="hover:text-gray-400 transition">
              <FaFacebook className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaTwitter className="text-2xl" />
            </a>
            <a href="#" className="hover:text-gray-400 transition">
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-10 bg-gray-100 dark:bg-gray-950">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-semibold text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="Aadil Nuhu"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2 text-sm font-semibold text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="name@gmail.com"
                required
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col">
              <label htmlFor="subject" className="mb-2 text-sm font-semibold text-gray-400">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-white focus:outline-none"
                placeholder="What’s this about?"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 text-sm font-semibold text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-white focus:outline-none resize-none"
                placeholder="Write your message here..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full px-8 py-3 bg-white text-black rounded-md font-bold tracking-wide hover:bg-gray-300 transition-colors shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact