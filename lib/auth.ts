import * as AuthSession from 'expo-auth-session';
import { fetchAPI } from './fetch';

export async function signInWithGoogle(sso: any) {
  try {
    const redirectUrl = AuthSession.makeRedirectUri();
    const { createdSessionId, setActive, signIn, signUp } = await sso({
      strategy: 'oauth_google',
      redirectUrl,
    });

    console.log(
      createdSessionId,
      'hihi',
      setActive,
      'hello',
      signIn,
      'whatup',
      signUp,
      'whatever'
    );

    if (createdSessionId) {
      if (setActive) {
        await setActive!({ session: createdSessionId });

        if (signUp.createdUserId) {
          await fetchAPI('/(api)/user', {
            method: 'POST',
            body: JSON.stringify({
              name: 'carl jung',
              email: signUp.emailAddress,
              clerkId: createdSessionId,
            }),
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
