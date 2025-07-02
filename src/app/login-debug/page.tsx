'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginDebugPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Login Debug Page</h1>
        
        {/* Quick fill buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">Quick Fill Demo Accounts:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => quickFill('admin@prismwriting.com', 'admin123')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Admin Account
            </button>
            <button
              onClick={() => quickFill('member@prismwriting.com', 'member123')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Member Account
            </button>
            <button
              onClick={() => quickFill('client@example.com', 'client123')}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Client Account
            </button>
          </div>
        </div>

        {/* Login form */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-900">Email:</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter email"
              aria-label="Email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-900">Password:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter password"
              aria-label="Password"
            />
          </div>
          <button
            onClick={testLogin}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Testing Login...' : 'Test Login'}
          </button>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md">
            <p className="text-red-700"><strong>Error:</strong> {error}</p>
          </div>
        )}

        {/* Response display */}
        {response && (
          <div className="mb-4 p-3 bg-gray-100 border border-gray-300 rounded-md">
            <h4 className="font-semibold mb-2 text-gray-900">API Response:</h4>
            <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto text-gray-800">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}

        {/* localStorage display */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Current localStorage:</h4>
          <div className="text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded text-gray-800 dark:text-gray-200">
            <p className="text-gray-800 dark:text-gray-200"><strong>prism_user:</strong> {localStorage.getItem('prism_user') || 'Not set'}</p>
            <p className="text-gray-800 dark:text-gray-200"><strong>prism_token:</strong> {localStorage.getItem('prism_token') || 'Not set'}</p>
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
