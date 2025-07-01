/**
 * Authentication Test Utility
 * Simple Node.js script to test the authentication credentials
 */

const testCredentials = [
  {
    email: 'Ariel.karagodskiy@gmail.com',
    password: 'Merlak0105!',
    role: 'admin'
  },
  {
    email: 'admin@prismwriting.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    email: 'member@prismwriting.com',
    password: 'member123',
    role: 'member'
  },
  {
    email: 'client@example.com',
    password: 'client123',
    role: 'client'
  }
];

// Mock the default users and passwords from auth.ts
const defaultUsers = [
  {
    id: '1',
    email: 'admin@prismwriting.com',
    name: 'Admin User',
    role: 'admin',
    joinedAt: '2024-01-01T00:00:00Z',
    permissions: ['read', 'write', 'delete', 'admin'],
    status: 'active'
  },
  {
    id: '2',
    email: 'member@prismwriting.com',
    name: 'Cooperative Member',
    role: 'member',
    joinedAt: '2024-01-15T00:00:00Z',
    permissions: ['read', 'write'],
    status: 'active'
  },
  {
    id: '3',
    email: 'client@example.com',
    name: 'Client User',
    role: 'client',
    joinedAt: '2024-02-01T00:00:00Z',
    permissions: ['read'],
    status: 'active'
  },
  {
    id: '4',
    email: 'Ariel.karagodskiy@gmail.com',
    name: 'Ariel Karagodskiy',
    role: 'admin',
    joinedAt: '2024-01-01T00:00:00Z',
    permissions: ['read', 'write', 'delete', 'admin'],
    status: 'active'
  }
];

const defaultPasswords = {
  'admin@prismwriting.com': 'admin123',
  'member@prismwriting.com': 'member123',
  'client@example.com': 'client123',
  'Ariel.karagodskiy@gmail.com': 'Merlak0105!'
};

console.log('🔐 Authentication Test Results');
console.log('================================');

testCredentials.forEach((creds, index) => {
  const user = defaultUsers.find(u => u.email === creds.email && u.status === 'active');
  const storedPassword = defaultPasswords[creds.email];
  
  console.log(`\n${index + 1}. Testing: ${creds.email}`);
  console.log(`   Password: ${creds.password}`);
  console.log(`   Expected Role: ${creds.role}`);
  
  if (!user) {
    console.log(`   ❌ User not found or inactive`);
  } else {
    console.log(`   ✅ User found: ${user.name} (${user.role})`);
    
    if (storedPassword === creds.password) {
      console.log(`   ✅ Password matches`);
      console.log(`   ✅ Authentication should succeed`);
    } else {
      console.log(`   ❌ Password mismatch`);
      console.log(`   Expected: ${storedPassword}`);
      console.log(`   Provided: ${creds.password}`);
    }
  }
});

console.log('\n🔍 Debug Information');
console.log('====================');
console.log('All registered users:');
defaultUsers.forEach(user => {
  console.log(`- ${user.email} (${user.role}) - Status: ${user.status}`);
});

console.log('\nAll stored passwords:');
Object.entries(defaultPasswords).forEach(([email, password]) => {
  console.log(`- ${email}: ${password}`);
});

console.log('\n📝 Troubleshooting Tips:');
console.log('========================');
console.log('1. Clear browser localStorage: localStorage.clear()');
console.log('2. Check browser console for errors');
console.log('3. Verify case sensitivity in email address');
console.log('4. Ensure password is entered exactly as shown');
console.log('5. Try in incognito/private browsing mode');
