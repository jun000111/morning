export const ENV = {
  // === Auth ===
  CLERK_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!,

  // === API ===
  API_URL: process.env.EXPO_PUBLIC_API_URL!,
};

// Optional: runtime validation
if (!ENV.CLERK_PUBLISHABLE_KEY || !ENV.API_URL) {
  throw new Error('Missing required environment variables in ENV.');
}
