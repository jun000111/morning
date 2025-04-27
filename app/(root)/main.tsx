import * as React from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import AutoScrollCarousel from '@/components/autoScroll/AutoScrollCarousel';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useEffect, useState } from 'react';
import { getAllPlatters } from '@/services/platterService';
import { Platter } from '@/types/Platter';

const MainScreen = () => {
  const [platters, setPlatters] = useState<Platter[]>([]);
  useEffect(() => {
    const fetchPlatters = async () => {
      const platters = await getAllPlatters();
      setPlatters(platters);
    };
    fetchPlatters();
  }, []);

  return (
    <SafeAreaView>
      <AutoScrollCarousel platters={platters} />
      <SignOutButton />
    </SafeAreaView>
  );
};

export default MainScreen;
