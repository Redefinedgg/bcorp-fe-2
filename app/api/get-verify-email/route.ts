import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/verify-new-email?token=${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Verification failed.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
