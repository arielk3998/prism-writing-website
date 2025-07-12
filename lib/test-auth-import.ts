// Test file to verify @prism/auth import works
import { prisma } from '@prism/auth';

export async function testAuth() {
  console.log('Testing @prism/auth import...');
  // This will test if the prisma import resolves correctly
  return prisma;
}

export default testAuth;
