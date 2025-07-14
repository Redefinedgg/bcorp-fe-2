import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'All fields are required.', message: 'All fields are required!' },
        { status: 400 }
      );
    }

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            email,
        }),
    });

    const data = await response.json();

    console.log('login data: ', data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Failed to process the request.' },
      { status: 500 }
    );
  }
}
