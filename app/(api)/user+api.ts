import { insertUser } from '@/db/user';
export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json({ error: 'Missing required fields' });
    }

    return new Response(
      JSON.stringify({ data: await insertUser({ name, email, clerkId }) })
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: error }, { status: 500 });
  }
}
