import background from '../assets/watchBackground.1jpg.jpg'

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-600 text-white">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src={background}
            alt="Ecommerce banner"
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-extrabold mb-4">About Ecommerce</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We’re more than just an online store — we’re a community built on
            trust, quality, and passion for making shopping simple and
            enjoyable.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-16 px-6 text-center">
        <div>
          <p className="text-4xl font-bold text-gray-600">50K+</p>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-600">10K+</p>
          <p className="text-gray-600">Products</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-600">25+</p>
          <p className="text-gray-600">Countries Served</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-gray-600">5 Years</p>
          <p className="text-gray-600">of Excellence</p>
        </div>
      </div>

      {/* Story, Mission, Values */}
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3 px-6 py-12">
        <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600">
            Founded in 2020, Ecommerce began with a simple goal: to make online
            shopping more transparent, affordable, and enjoyable. From a small
            startup, we’ve grown into a trusted marketplace for thousands
            worldwide.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            We’re on a mission to connect people with the products they love,
            while offering unbeatable value, fast delivery, and customer-first
            service at every step.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Values
          </h2>
          <p className="text-gray-600">
            Integrity, sustainability, and innovation guide us. We believe in
            ethical sourcing, eco-friendly packaging, and supporting local
            communities.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          <p className="text-gray-600 mt-2">
            The people behind Ecommerce are passionate about technology,
            commerce, and building connections that last.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              src="https://source.unsplash.com/200x200/?person,ceo"
              alt="CEO"
            />
            <h3 className="text-lg font-semibold">Alex Johnson</h3>
            <p className="text-sm text-gray-500">Founder & CEO</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              src="https://source.unsplash.com/200x200/?person,designer"
              alt="Designer"
            />
            <h3 className="text-lg font-semibold">Sophia Lee</h3>
            <p className="text-sm text-gray-500">Head of Design</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <img
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              src="https://source.unsplash.com/200x200/?person,developer"
              alt="Developer"
            />
            <h3 className="text-lg font-semibold">David Kim</h3>
            <p className="text-sm text-gray-500">Lead Developer</p>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="max-w-4xl mx-auto text-center py-16 px-6">
        <blockquote className="text-2xl italic font-medium text-gray-800">
          “Ecommerce has completely changed the way I shop online. The experience
          is seamless, and the products are always top-notch. Highly
          recommended!”
        </blockquote>
        <p className="mt-4 text-gray-600">— Emma Williams, Verified Customer</p>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Join Our Community Today</h2>
        <p className="text-lg mb-6">
          Discover the products you love, backed by the people you trust.
        </p>
        <a
          href="/shop"
          className="inline-block px-8 py-4 bg-white text-gray-600 font-semibold rounded-md shadow hover:bg-gray-100 transition"
        >
          Start Shopping
        </a>
      </div>
    </div>
  );
};

export default About;
