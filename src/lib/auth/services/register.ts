/**
 * STUB: Register Service
 * This is a stub implementation to resolve build issues
 */

export async function register(email: string, password: string, name: string): Promise<any> {
  console.log('STUB: register called with:', { email, name });
  return {
    success: false,
    message: 'Register service not implemented - stub version'
  };
}

export async function sendVerificationEmail(email: string): Promise<{ success: boolean; message: string }> {
  console.log('STUB: sendVerificationEmail called');
  return {
    success: true,
    message: 'Verification email sent - stub version'
  };
}

export async function verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
  console.log('STUB: verifyEmail called');
  return {
    success: true,
    message: 'Email verified - stub version'
  };
}
