import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Prism Writing</h1>
          <div className="space-x-4">
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Professional Translation & Writing Services
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Fast, accurate, and culturally adapted content for global businesses
          </p>
          <div className="space-x-4">
            <Link 
              href="/services" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Our Services
            </Link>
            <Link 
              href="/translation-quote" 
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
            >
              Get Quote
            </Link>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Document Translation</h3>
              <p className="text-gray-600">Professional translation of documents in 80+ languages</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Website Localization</h3>
              <p className="text-gray-600">Culturally adapted content for global markets</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Content Writing</h3>
              <p className="text-gray-600">Expert writing services for businesses</p>
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="space-x-4">
            <Link 
              href="/register"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-green-700"
            >
              Create Account
            </Link>
            <Link 
              href="/login"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Prism Writing. Professional translation and writing services.</p>
        </div>
      </footer>
    </div>
  )
}
