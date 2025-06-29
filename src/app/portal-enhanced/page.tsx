/**
 * Enhanced Member Portal
 * 
 * Complete member portal webapp with user authentication, dashboard,
 * and file management system for clients and cooperative members.
 * 
 * @module EnhancedPortal
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { AuthForms } from '../../components/auth/AuthForms';
import EnhancedDashboard from '../../components/portal/EnhancedDashboard';

function PortalContent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white/70">Loading portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForms />;
  }

  return <EnhancedDashboard user={user} />;
}

export default function EnhancedPortal() {
  return (
    <AuthProvider>
      <PortalContent />
    </AuthProvider>
  );
}
