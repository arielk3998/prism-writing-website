import Navigation from '../../components/layout/Navigation';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/privacy" />
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              <strong>Last updated:</strong> June 2025
            </p>
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Prism Writing Technical Writing Cooperative is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
