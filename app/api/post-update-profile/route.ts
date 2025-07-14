import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLogoutForApi } from '@/app/utils/getLocaleForApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value; 

    const { fields, values } = body;

    if (!fields || !values) {
      return NextResponse.json(
        { error: 'Field and value are required.', message: 'Field and value are required!' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/users/update-profile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          fields,
          values
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
