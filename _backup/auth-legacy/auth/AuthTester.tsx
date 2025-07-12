/**
 * Authentication Debug Component
 * Provides direct testing of authentication functions
 */

'use client';

import React, { useState } from 'react';
import { login } from '../../lib/auth';

export function AuthTester() {
  const [email, setEmail] = useState('ariel.pk@outlook.com');
  const [password, setPassword] = useState('Merlak0105!');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testLogin = async () => {
    setIsLoading(true);
    setResult('Testing...');
    
    try {
      console.log('Testing login with:', { email, password });
      
      // Test the login function directly
      const loginResult = await login({ email, password });
      
      if (loginResult && 'user' in loginResult) {
        setResult(`✅ SUCCESS: Logged in as ${loginResult.user.email} (${loginResult.user.role})`);
        console.log('Login successful:', loginResult);
      } else {
        setResult(`❌ FAILED: ${loginResult && 'error' in loginResult ? loginResult.error : 'Unknown error'}`);
        console.log('Login failed:', loginResult);
      }
    } catch (error) {
      setResult(`❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.removeItem('prism-users');
    localStorage.removeItem('prism-passwords');
    localStorage.removeItem('prism-auth-token');
    setResult('🧹 LocalStorage cleared. Refresh the page to reload defaults.');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Direct Authentication Test</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={testLogin}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Login'}
          </button>
          
          <button
            onClick={clearStorage}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Clear Storage
          </button>
        </div>
        
        {result && (
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <code className="text-sm">{result}</code>
          </div>
        )}
      </div>
    </div>
  );
}
