import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of API Documentation: Making Technical Content Accessible",
      excerpt: "Learn how to create API documentation that developers actually want to use, with practical tips and real-world examples.",
      date: "2024-12-15",
      category: "API Documentation",
      readTime: "5 min read",
      author: "Prism Writing Team"
    },
    {
      id: 2,
      title: "HIPAA Compliance in Technical Documentation: What You Need to Know",
      excerpt: "Navigate the complex world of HIPAA compliance for healthcare technical documentation with our comprehensive guide.",
      date: "2024-12-10",
      category: "Compliance",
      readTime: "7 min read",
      author: "Prism Writing Team"
    },
    {
      id: 3,
      title: "Standard Operating Procedures: Best Practices for Manufacturing",
      excerpt: "Discover how to create SOPs that improve efficiency, ensure compliance, and reduce training time in manufacturing environments.",
      date: "2024-12-05",
      category: "SOPs",
      readTime: "6 min read",
      author: "Prism Writing Team"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/blog" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technical Writing Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Stay informed with the latest trends, best practices, and insights in technical writing, 
            documentation, and compliance across industries.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights on technical writing, documentation best practices, and industry compliance delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
