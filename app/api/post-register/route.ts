import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, role, birthDate, password, repeatPassword, locale } = body;

    if (!name || !email || !role || !password || !repeatPassword || !birthDate) {
      return NextResponse.json(
        { error: 'All fields are required.', message: 'All fields are required!' },
        { status: 400 }
      );
    }

    const [firstName, surname] = name.split(' ');

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName,
          surname,
          email,
          regType: 'form',
          role,
          birthDate,
          password,
          repeatPassword,
          locale
        }),
    });

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
