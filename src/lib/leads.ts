/**
 * Database library for Contact Inquiries / Lead Management
 * Centralized database operations
 */

import { PrismaClient } from '@prisma/client';

// Create a global prisma instance
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };

// Types for lead management
export type ContactInquiryWithUser = {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED_LOST' | 'FOLLOW_UP_SCHEDULED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  source?: string;
  lastContactedAt?: Date;
  nextFollowUpAt?: Date;
  assignedTo?: string;
  assignedUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  notes?: string;
  autoResponded: boolean;
  addedToNewsletter: boolean;
  allowFollowUp: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LeadFilters = {
  status?: string;
  priority?: string;
  assignedTo?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type LeadUpdate = {
  id: string;
  status?: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED_LOST' | 'FOLLOW_UP_SCHEDULED';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  assignedTo?: string | null;
  notes?: string | null;
  nextFollowUpAt?: Date | null;
  lastContactedAt?: Date | null;
};

// Database operations
export async function getLeads(filters: LeadFilters) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: Record<string, any> = {};
  
  if (filters.status) {
    where.status = filters.status;
  }
  
  if (filters.priority) {
    where.priority = filters.priority;
  }
  
  if (filters.assignedTo) {
    where.assignedTo = filters.assignedTo;
  }
  
  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      where.createdAt.gte = new Date(filters.dateFrom);
    }
    if (filters.dateTo) {
      where.createdAt.lte = new Date(filters.dateTo);
    }
  }
  
  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search } },
      { email: { contains: filters.search } },
      { company: { contains: filters.search } },
      { message: { contains: filters.search } },
    ];
  }

  const page = filters.page || 1;
  const limit = filters.limit || 25;

  const [totalCount, leads] = await Promise.all([
    // @ts-expect-error - Prisma client model will be available at runtime
    prisma.contactInquiry.count({ where }),
    // @ts-expect-error - Prisma client model will be available at runtime
    prisma.contactInquiry.findMany({
      where,
      include: {
        assignedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          }
        }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit,
    })
  ]);

  return {
    leads,
    pagination: {
      current: page,
      limit,
      total: totalCount,
      pages: Math.ceil(totalCount / limit),
    }
  };
}

export async function updateLead(updateData: LeadUpdate) {
  const { id, ...data } = updateData;
  
  // @ts-expect-error - Prisma client model will be available at runtime
  return await prisma.contactInquiry.update({
    where: { id },
    data,
    include: {
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        }
      }
    }
  });
}

export async function deleteLead(id: string) {
  // @ts-expect-error - Prisma client model will be available at runtime
  return await prisma.contactInquiry.delete({
    where: { id }
  });
}

export async function getLeadById(id: string) {
  // @ts-expect-error - Prisma client model will be available at runtime
  return await prisma.contactInquiry.findUnique({
    where: { id },
    include: {
      assignedUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        }
      }
    }
  });
}

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
    where: {
      status: 'ACTIVE'
    }
  });
}
