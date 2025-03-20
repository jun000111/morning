import { Link, Stack } from 'expo-router';

import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 bg-blue-500">
        <Text>This screen doesn't exist.</Text>
        <Link href={'/'}>Go To Home Page</Link>
      </View>
    </>
  );
}
