'use client';

import React from 'react';
import { PasswordProtection } from '@/components/auth/PasswordProtection';
import Dashboard from '@/components/portal/Dashboard';

export default function Portal() {
  // Mock user data for demo purposes
  const mockUser = {
    id: '1',
    name: 'Demo User',
    email: 'demo@prismwriting.com',
    role: 'client' as const,
    avatar: undefined
  };

  return (
    <PasswordProtection>
      <Dashboard user={mockUser} />
    </PasswordProtection>
  );
}
