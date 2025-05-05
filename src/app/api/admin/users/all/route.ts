import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      // Optionally select specific fields or order the results
      // select: { id: true, firstName: true, lastName: true, email: true, role: true },
      // orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}