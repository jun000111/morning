import { useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/'); // Navigate to root (or change to your desired route)
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};
