import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {


    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}

// Optional: Handle GET requests if needed, perhaps redirecting or showing an error
export async function GET() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}