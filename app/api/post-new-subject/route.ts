import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLogoutForApi } from '@/app/utils/getLocaleForApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;

    const { subject } = body;

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject not found.', message: 'Subject not found!' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/teacher/subject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject
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
