import { getLogoutForApi } from '@/app/utils/getLocaleForApi';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    const body = await request.json();

    const { lessonId } = body;

    if (!lessonId) {
      return NextResponse.json(
        { error: 'lessonId are required.', message: 'lessonId are required!' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/teacher/cancel-lesson/${lessonId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
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
