<<<<<<< HEAD
import { View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <View className="flex-1 bg-success-500">
        <Text className="text-black">hi</Text>
      </View>
    </SafeAreaView>
  );
=======
import { Redirect } from 'expo-router';
const Home = () => {
  return <Redirect href="/(auth)/welcome" />;
>>>>>>> feature_1
};

export default Home;
