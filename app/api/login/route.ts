import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { username, hashedPassword } = await req.json();

    if (!username || !hashedPassword) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Mock response for successful login
    return NextResponse.json({ message: 'Login Successful' }, { status: 200 });

  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ message: 'Error parsing JSON' }, { status: 400 });
  }
}
