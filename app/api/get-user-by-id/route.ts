import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required.' },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: 'User ID is required.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'User not found.' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error getting user by id:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
