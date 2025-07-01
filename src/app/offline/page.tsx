// 📱 Offline Page Component
// Phase 4: PWA Implementation

import React from 'react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Offline Icon */}
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl">📴</span>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          You&apos;re Offline
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still use some features of Prism Writing while offline.
        </p>

        {/* Available Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Available Offline Features
          </h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              View cached project data
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Read previously loaded documents
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Draft new content (saved locally)
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✓</span>
              Access user settings
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            🔄 Try Again
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            ← Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Your work will be automatically saved and synced when you reconnect to the internet.
          </p>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}
