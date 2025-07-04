/**
 * Contact Information Hook
 * 
 * Provides dynamic contact information that auto-updates when admin profile changes.
 * This ensures consistent contact info across the entire website.
 * 
 * @module useContactInfo
 * @version 1.0.0
 */

'use client';

import { useState, useEffect } from 'react';
import { teamMembers } from '../data/teamData';

export interface ContactInfo {
  name: string;
  email: string;
  phone?: string;
  title: string;
  bio: string;
}

export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the super admin (Ariel) from team members
    const superAdmin = teamMembers.find(
      member => member.role.includes('Founder') || member.role.includes('CEO') || member.name === 'Ariel'
    );

    if (superAdmin) {
      setContactInfo({
        name: superAdmin.name,
        email: superAdmin.email || 'ariel.pk@outlook.com',
        title: superAdmin.title,
        bio: superAdmin.bio,
      });
    } else {
      // Fallback contact info
      setContactInfo({
        name: 'Ariel Karagodskiy',
        email: 'ariel.pk@outlook.com',
        title: 'Founder & CEO',
        bio: 'Founder and leader of Prism Writing Cooperative',
      });
    }
    
    setIsLoading(false);
  }, []);

  // Function to update contact info (could be connected to admin profile updates)
  const updateContactInfo = (newInfo: Partial<ContactInfo>) => {
    setContactInfo(prev => prev ? { ...prev, ...newInfo } : null);
  };

  return {
    contactInfo,
    isLoading,
    updateContactInfo,
  };
}

// Static contact info getter for components that need immediate access
export function getStaticContactInfo(): ContactInfo {
  const superAdmin = teamMembers.find(
    member => member.role.includes('Founder') || member.role.includes('CEO') || member.name === 'Ariel'
  );

  if (superAdmin) {
    return {
      name: superAdmin.name,
      email: superAdmin.email || 'ariel.pk@outlook.com',
      title: superAdmin.title,
      bio: superAdmin.bio,
    };
  }

  return {
    name: 'Ariel Karagodskiy',
    email: 'ariel.pk@outlook.com',
    title: 'Founder & CEO',
    bio: 'Founder and leader of Prism Writing Cooperative',
  };
}
