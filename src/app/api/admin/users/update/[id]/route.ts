import { PrismaClient, Role } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

// Define the expected request body structure
interface UpdateUserRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role; // Assuming Role enum is imported or defined
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const body: UpdateUserRequestBody = await request.json();

    // Basic validation: Check if at least one field is provided for update
    if (Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'No update data provided' }, { status: 400 });
    }

    // Validate role if provided
    if (body.role && !Object.values(Role).includes(body.role)) {
        return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prepare update data, only including fields that were actually sent
    const updateData: Partial<UpdateUserRequestBody> = {};
    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;
    if (body.email !== undefined) updateData.email = body.email; // Add email validation if needed
    if (body.role !== undefined) updateData.role = body.role;

    // Update the user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    console.log(`User updated successfully: ${userId}`);
    return NextResponse.json({ message: 'User updated successfully', user: updatedUser }, { status: 200 });

  } catch (error: any) {
    console.error('Error updating user:', error);
    // Handle potential errors like unique constraint violation (e.g., email already exists)
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json({ error: 'Email address already in use' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}