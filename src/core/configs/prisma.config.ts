import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function prismaConnect() {
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (err) {
    console.error('Prisma connection error', err);
    process.exit(1);
  }
}

export { prisma };
