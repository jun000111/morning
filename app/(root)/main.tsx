import * as React from 'react';
import { SafeAreaView, View, Text, Dimensions, Pressable } from 'react-native';
import AutoScrollCarousel from '@/components/autoScroll/AutoScrollCarousel';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useEffect, useState } from 'react';
import { getAllPlatters } from '@/services/platterService';
import { PlatterIngredientNutrition } from '@/types/Platter';
import { router } from 'expo-router';

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

  const handleReloadDatabase = async () => {
    const platters = await getAllPlatters();
    console.log(platters);
  };

  const handleCalender = () => {
    router.push('/(root)/calendar');
  };

  return (
    <SafeAreaView>
      <AutoScrollCarousel platters={platters} />
      <SignOutButton />
      <Pressable
        accessibilityRole="button"
        onPress={handleReloadDatabase}
        className="bg-blue-500 py-2 px-4 rounded my-2"
      >
        <Text>reload database</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={handleCalender}
        className="bg-blue-500 py-2 px-4 rounded my-2"
      >
        <Text>to calendar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MainScreen;
