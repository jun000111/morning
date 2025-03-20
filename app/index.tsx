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
};

export default Home;
