import React, { useCallback } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useSSO } from '@clerk/clerk-expo';
import { useWarmUpBrowser } from '@/lib/useWarmUpBrowser';
import { signInWithGoogle } from '@/lib/auth';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  useWarmUpBrowser();
  const router = useRouter();
  const { startSSOFlow } = useSSO();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await signInWithGoogle(startSSOFlow);
      if (result.success) {
        router.replace('/');
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);

  return (
    <View>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
}
