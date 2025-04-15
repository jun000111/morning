import { sql } from './index';

export async function insertUser({
  name,
  email,
  clerkId,
}: {
  name: string;
  email: string;
  clerkId: string;
}) {
  return await sql`
  INSERT INTO users (name, email, clerk_id )
  VALUES(${name},${email},${clerkId})`;
}
