import { PrismaClient } from "@prisma/client";

// Global variable that defines the database
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Creates new client if it doesn't already exist
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Does not recreate database when restarting server
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export const db = prisma;