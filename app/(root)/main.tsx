import * as React from 'react';
import { SafeAreaView, View, Text, Dimensions, Pressable } from 'react-native';
import AutoScrollCarousel from '@/components/autoScroll/AutoScrollCarousel';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useEffect, useState } from 'react';
import { getAllPlatters } from '@/services/platterService';
import { PlatterIngredientNutrition } from '@/types/Platter';

const MainScreen = () => {
  const [platters, setPlatters] = useState<
    Record<string, PlatterIngredientNutrition[]>
  >({});
  useEffect(() => {
    const fetchPlatters = async () => {
      const platters = await getAllPlatters();
      setPlatters(platters);
    };
    fetchPlatters();
  }, []);

  const handleOnPress = async () => {
    const platters = await getAllPlatters();
    console.log(platters);
  };

  return (
    <SafeAreaView>
      <AutoScrollCarousel platters={platters} />
      <SignOutButton />
      <Pressable
        accessibilityRole="button"
        onPress={handleOnPress}
        className="bg-blue-500 py-2 px-4 rounded"
      >
        <Text>hi</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainScreen;
