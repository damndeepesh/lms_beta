import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = (await params).id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Check if the user exists before attempting to delete
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId },
    });

    console.log(`User deleted successfully: ${userId}`);
    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error deleting user:', error);
    // Check for specific Prisma errors if needed
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}