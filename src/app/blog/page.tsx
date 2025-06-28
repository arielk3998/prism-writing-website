import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { CTA_MESSAGES } from '../../lib/constants';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "5 Common API Documentation Mistakes That Drive Developers Away",
      excerpt: "Learn how to avoid the most common pitfalls in API documentation that cause developer frustration and abandonment.",
      date: "2024-06-15",
      readTime: "8 min read",
      category: "API Documentation",
      author: "Prism Writing Team"
    },
    {
      id: 2,
      title: "The ROI of Better Technical Documentation",
      excerpt: "Discover how investing in quality technical documentation can reduce support costs and improve user satisfaction.",
      date: "2024-06-10",
      readTime: "6 min read",
      category: "Business Impact",
      author: "Prism Writing Team"
    },
    {
      id: 3,
      title: "User-Centered Design for SOPs: Making Procedures People Actually Follow",
      excerpt: "Transform your standard operating procedures from dusty documents into actionable guides your team will actually use.",
      date: "2024-06-05",
      readTime: "10 min read",
      category: "Process Documentation",
      author: "Prism Writing Team"
    },
    {
      id: 4,
      title: "Interactive Documentation: Beyond Static Pages",
      excerpt: "Explore how interactive elements can transform user documentation from passive reading to active learning.",
      date: "2024-05-28",
      readTime: "7 min read",
      category: "User Experience",
      author: "Prism Writing Team"
    },
    {
      id: 5,
      title: "Documentation Metrics That Matter: What to Track and Why",
      excerpt: "Learn which documentation metrics actually predict user success and how to measure documentation effectiveness.",
      date: "2024-05-20",
      readTime: "9 min read",
      category: "Analytics",
      author: "Prism Writing Team"
    }
  ];

  const categories = [
    "All Posts",
    "API Documentation", 
    "User Experience",
    "Process Documentation",
    "Business Impact",
    "Analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/blog" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Technical Writing Insights
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Expert insights, best practices, and actionable tips for creating documentation that users love.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  category === "All Posts" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <Link href={`/blog/${post.id}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        By {post.author}
                      </span>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Get Expert Tips
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Subscribe to our newsletter for monthly technical writing insights and best practices.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>

                {/* Popular Posts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Popular Posts
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post) => (
                      <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                          <Link href={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {post.readTime}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Need Help With Your Documentation?
                  </h3>
                  <p className="text-indigo-100 mb-4">
                    Let our experts create documentation that your users will love.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {CTA_MESSAGES.services.primary}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
