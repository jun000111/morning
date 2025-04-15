import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_PW}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json({ error: 'Missing required fields' });
    }

    console.log(clerkId, 'what is my name');
    const response = await sql`
  INSERT INTO users (
  name,
  email,
  clerk_id
  )
  VALUES(
  ${name},
  ${email},
  ${clerkId}
  )
  `;

    return new Response(JSON.stringify({ data: response }));
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
