import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `prisma` to be of type PrismaClient | undefined
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
