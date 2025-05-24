import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: List all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: true,
        students: true
      }
    });
    return NextResponse.json({ courses });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// POST: Create a new course
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, teacherId, studentIds, batch } = body;
    const course = await prisma.course.create({
      data: {
        name,
        description,
        teacherId,
        batch,
        students: studentIds && studentIds.length > 0 ? {
          connect: studentIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: {
        teacher: true,
        students: true
      }
    });
    return NextResponse.json({ course });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}