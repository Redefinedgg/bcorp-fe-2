import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLogoutForApi } from '@/app/utils/getLocaleForApi';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json(
      { error: 'Token is required.' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/lessons/dates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.status === 401) {
      return NextResponse.redirect(new URL(`${getLogoutForApi(request)}`));
    }

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
