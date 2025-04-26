import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto'; // For generating temporary password

const prisma = new PrismaClient();

// Function to generate a random temporary password
function generateTemporaryPassword(length = 12): string {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length); // return required number of characters
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, role } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Validate role
    if (!Object.values(Role).includes(role as Role)) {
        return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    // Generate temporary password
    const temporaryPassword = generateTemporaryPassword();
    console.log(`Generated temporary password for ${email}: ${temporaryPassword}`); // Log for admin/dev purposes ONLY - REMOVE in production

    // Hash the temporary password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(temporaryPassword, saltRounds);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role as Role,
        passwordResetRequired: true, // Force password reset on first login
      },
    });

    // TODO: In a real application, you would email the temporary password to the user.
    // For now, we just return success.

    // Return only non-sensitive data
    return NextResponse.json({ 
        message: 'User created successfully. Temporary password generated.',
        userId: newUser.id,
        email: newUser.email 
        // DO NOT return the temporary password here in a real app
    }, { status: 201 });

  } catch (error) {
    console.error('User creation error:', error);
    // Check for specific Prisma errors if needed
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}