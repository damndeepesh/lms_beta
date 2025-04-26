import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

    // Validate input
    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email and new password are required' }, { status: 400 });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Avoid revealing if an email exists or not for security
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password and reset the flag
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        passwordResetRequired: false, // Clear the flag
      },
    });

    return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 });

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}