import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
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
    // Destructure all fields from the request body
    const { firstName, lastName, email, role, batch, studentId, department, phoneNumber, dateOfBirth } = await req.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate batch if role is STUDENT and batch is provided
    if (role === Role.STUDENT && batch !== undefined && batch !== null) {
      const batchYear = parseInt(batch, 10);
      if (isNaN(batchYear) || batchYear < 1900 || batchYear > new Date().getFullYear() + 10) { // Basic year validation
        return NextResponse.json({ error: 'Invalid batch year provided' }, { status: 400 });
      }
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

    // Prepare data for user creation, including optional fields
    const userData: any = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role as Role,
      passwordResetRequired: true, // Force password reset on first login
    };

    // Conditionally add role-specific and optional fields
    if (role === Role.STUDENT) {
      if (batch !== undefined && batch !== null) {
        userData.batch = parseInt(batch, 10);
      }
      if (studentId) {
        userData.studentId = studentId;
      }
      if (department) {
        userData.department = department;
      }
    } else if (role === Role.TEACHER) {
        if (department) {
            userData.department = department;
        }
    }

    if (phoneNumber) {
      userData.phoneNumber = phoneNumber;
    }

    if (dateOfBirth) {
      // Ensure dateOfBirth is a valid date string or Date object before saving
      try {
        userData.dateOfBirth = new Date(dateOfBirth);
      } catch (dateError) {
        console.error('Invalid date format for dateOfBirth:', dateOfBirth);
        // Handle invalid date format, maybe return an error response
        return NextResponse.json({ error: 'Invalid date format for Date of Birth' }, { status: 400 });
      }
    }

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: userData,
    });

    // TODO: In a real application, you would email the temporary password to the user.
    // For now, we just return success.

    // Return user data including the temporary password (FOR DEBUGGING ONLY)
    return NextResponse.json({ 
        message: 'User created successfully.',
        userId: newUser.id,
        email: newUser.email, 
        temporaryPassword: temporaryPassword // Include temporary password in response
    }, { status: 201 });

  } catch (error) {
    console.error('User creation error:', error);
    // Check for specific Prisma errors if needed
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}