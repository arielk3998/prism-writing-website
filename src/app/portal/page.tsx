import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function Portal() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/portal" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Client Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Access your projects, collaborate with our team, and track progress in real-time through our secure client portal.
          </p>
        </div>
      </section>

      {/* Portal Access */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Portal Access
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Sign in to access your project dashboard, documents, and collaboration tools.
              </p>
            </div>

            {/* Login Form */}
            <div className="max-w-md mx-auto">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don&apos;t have access yet?{' '}
                <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Contact us
                </Link>{' '}
                to get started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Portal Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Project Dashboard",
                description: "Track project progress, milestones, and deliverables in real-time.",
                icon: "📊"
              },
              {
                title: "Document Repository",
                description: "Access all project documents, drafts, and final deliverables in one place.",
                icon: "📁"
              },
              {
                title: "Collaboration Tools",
                description: "Provide feedback, request revisions, and communicate with our team directly.",
                icon: "💬"
              },
              {
                title: "Version Control",
                description: "View document history, track changes, and access previous versions.",
                icon: "🔄"
              },
              {
                title: "Resource Library",
                description: "Access templates, style guides, and best practice documentation.",
                icon: "📚"
              },
              {
                title: "Secure Access",
                description: "Enterprise-grade security with role-based access controls.",
                icon: "🔒"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
