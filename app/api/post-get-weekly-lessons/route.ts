import { getLogoutForApi } from '@/app/utils/getLocaleForApi';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    const body = await request.json();

    const { date } = body;

    if (!date) {
      return NextResponse.json(
        { error: 'date are required.', message: 'date are required!' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/lessons/week`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            date
        }),
    });

    if (response.status === 401) {
      return NextResponse.redirect(new URL(`${getLogoutForApi(request)}`));
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request.' },
      { status: 500 }
    );
  }
}
