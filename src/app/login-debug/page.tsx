'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginDebugPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localStorageData, setLocalStorageData] = useState({
    prism_user: 'Loading...',
    prism_token: 'Loading...'
  });
  const router = useRouter();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    updateLocalStorageDisplay();
  }, []);

  const updateLocalStorageDisplay = () => {
    if (typeof window !== 'undefined') {
      setLocalStorageData({
        prism_user: localStorage.getItem('prism_user') || 'Not set',
        prism_token: localStorage.getItem('prism_token') || 'Not set'
      });
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      setResponse({ status: res.status, data });

      if (res.ok) {
        // Store in localStorage
        const userData = {
          id: data.user.id,
          name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || data.user.email,
          email: data.user.email,
          role: data.user.role.toLowerCase().replace('_', '-'),
          avatar: data.user.avatar
        };
        
        localStorage.setItem('prism_user', JSON.stringify(userData));
        localStorage.setItem('prism_token', 'authenticated');
        
        // Update the display immediately
        updateLocalStorageDisplay();
        
        alert('Login successful! Check localStorage and console.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (email: string, password: string) => {
    setCredentials({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Login Debug Page</h1>
        
        {/* Quick fill buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Quick Fill Demo Accounts:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => quickFill('admin@prismwriting.com', 'admin123')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Fill admin account credentials"
            >
              Admin Account
            </button>
            <button
              onClick={() => quickFill('member@prismwriting.com', 'member123')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Fill member account credentials"
            >
              Member Account
            </button>
            <button
              onClick={() => quickFill('client@example.com', 'client123')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              aria-label="Fill client account credentials"
            >
              Client Account
            </button>
          </div>
        </div>

        {/* Login form */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Email:</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter email"
              aria-label="Email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Password:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Enter password"
              aria-label="Password"
            />
          </div>
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Test login with entered credentials"
          >
            {loading ? 'Testing Login...' : 'Test Login'}
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md">
            <p className="text-red-700 dark:text-red-300"><strong>Error:</strong> {error}</p>
          </div>
        )}

        {/* Response display */}
        {response && (
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">API Response:</h4>
            <pre className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded overflow-x-auto text-gray-800 dark:text-gray-200">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* localStorage display */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Current localStorage:</h4>
          <div className="text-sm bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600">
            <div className="space-y-2">
              <p className="text-gray-900 dark:text-white">
                <span className="font-bold text-gray-900 dark:text-white">prism_user:</span> 
                <span className="ml-2 text-gray-700 dark:text-gray-300">{localStorageData.prism_user}</span>
              </p>
              <p className="text-gray-900 dark:text-white">
                <span className="font-bold text-gray-900 dark:text-white">prism_token:</span> 
                <span className="ml-2 text-gray-700 dark:text-gray-300">{localStorageData.prism_token}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            aria-label="Navigate to admin dashboard"
          >
            Go to Admin
          </button>
          <button
            onClick={() => router.push('/portal-enhanced')}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label="Navigate to enhanced portal"
          >
            Go to Portal Enhanced
          </button>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label="Navigate to login page"
          >
            Go to Real Login
          </button>
        </div>
      </div>
    </div>
  );
}
