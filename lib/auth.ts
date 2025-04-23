import * as AuthSession from 'expo-auth-session';
import { registerUser } from '@/services/authService';

export async function signInWithGoogle(sso: any) {
  try {
    const redirectUrl = AuthSession.makeRedirectUri();
    const { createdSessionId, setActive, signIn, signUp } = await sso({
      strategy: 'oauth_google',
      redirectUrl,
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          await registerUser({
            name: 'carl jung',
            email: signUp.emailAddress,
            clerkId: createdSessionId,
          });
        }
        return {
          success: true,
          code: 'success',
          message: 'Successful Authentication',
        };
      }
    }

    return {
      success: false,
      code: 'fail',
      message: 'Failed Authentication',
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error?.error[0]?.longMessage,
    };
  }
}
