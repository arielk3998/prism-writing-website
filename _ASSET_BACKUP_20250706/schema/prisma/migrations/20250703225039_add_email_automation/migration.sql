-- CreateTable
CREATE TABLE "email_schedules" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "scheduledFor" DATETIME NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    "emailId" TEXT,
    "sentAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "email_schedules_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "contact_inquiries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "email_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "leadId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "emailId" TEXT,
    "subject" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SENT',
    "sentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openedAt" DATETIME,
    "clickedAt" DATETIME,
    "bouncedAt" DATETIME,
    CONSTRAINT "email_logs_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "contact_inquiries" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "email_templates" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'FOLLOW_UP',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "delay" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
