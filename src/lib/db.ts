import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

module.exports = { prismaClient };
