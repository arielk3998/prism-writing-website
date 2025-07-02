/**
 * Team Section Component
 * 
 * Displays team members with their expertise and achievements.
 * Uses real member data instead of false advertising.
 * 
 * @module TeamSection
 * @version 1.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { teamMembers, getActiveMembers } from '../../data/teamData';

interface TeamSectionProps {
  showAll?: boolean;
  limit?: number;
  className?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ 
  showAll = false, 
  limit = 3,
  className = '' 
}) => {
  const members = showAll ? getActiveMembers() : getActiveMembers().slice(0, limit);

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our founding members bring decades of specialized experience in technical writing, 
            UX design, and scientific documentation across diverse industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Member Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {member.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {member.role}
                </p>
                {member.isFoundingMember && (
                  <span className="inline-block mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                    Founding Member
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>

              {/* Specializations */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Core Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.specializations.slice(0, 3).map((spec, specIndex) => (
                    <span
                      key={specIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                  {member.specializations.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                      +{member.specializations.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Industries */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Industry Experience
                </h4>
                <div className="space-y-1">
                  {member.industries.slice(0, 2).map((industry, industryIndex) => (
                    <div key={industryIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                      {industry}
                    </div>
                  ))}
                  {member.industries.length > 2 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      +{member.industries.length - 2} additional industries
                    </div>
                  )}
                </div>
              </div>

              {/* Key Achievement */}
              {member.achievements.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Notable Achievement
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    &ldquo;{member.achievements[0]}&rdquo;
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {!showAll && teamMembers.length > limit && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/about#team"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Full Team
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
