import { neon } from '@neondatabase/serverless';

export const sql = neon(`${process.env.EXPO_PUBLIC_DATABASE_PW}`);
