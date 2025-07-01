/**
 * Login Page
 * 
 * Standalone login page for testing the new authentication system
 */

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <LoginForm 
        title="Welcome Back"
        description="Sign in to access your Prism Writing account"
        redirectTo="/admin"
        showDemoAccounts={true}
      />
    </main>
  );
}
