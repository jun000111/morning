import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useSSO, useAuth } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/lib/useWarmUpBrowser';
import { registerUser } from '@/services/authService';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSSO({ page }: { page: string }) {
  useWarmUpBrowser();
  const router = useRouter();
  const { startSSOFlow } = useSSO();
  const { getToken } = useAuth(); // ✅ Hook is safe here

  const handleGoogleSSO = useCallback(async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri();

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl,
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });

        // ✅ Get Clerk token *after* setting the session
        const token = await getToken();

        // 🔐 Send token to backend to register user
        if (page === 'signUp') {
          await registerUser(token!);
        }

        router.replace('/(root)/main');
      }
    } catch (err) {
      console.error('Login error:', JSON.stringify(err, null, 2));
    }
  }, [getToken]);

  return (
    <View>
      <Button
        title={
          page === 'signUp' ? 'Sign up with Google' : 'Sign in with Google'
        }
        onPress={handleGoogleSSO}
      />
    </View>
  );
}
