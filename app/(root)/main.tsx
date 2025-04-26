import * as React from 'react';
import { SafeAreaView, View, Text, Dimensions } from 'react-native';
import AutoScrollCarousel from '@/components/autoScroll/AutoScrollCarousel';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { useEffect } from 'react';
import { getAllPlatters } from '@/services/platterService';

const data = [
  { id: '1', title: 'item 1' },
  { id: '2', title: 'item 2' },
  { id: '3', title: 'item 3' },
  { id: '4', title: 'item 4' },
  { id: '5', title: 'item 4' },
  { id: '6', title: 'item 4' },
  { id: '7', title: 'item 4' },
  { id: '8', title: 'item 4' },
  { id: '9', title: 'item 4' },
  { id: '10', title: 'item 4' },
  { id: '11', title: 'item 4' },
];

const Main = () => {
  useEffect(() => {
    const fetchPlatters = async () => {
      const items = await getAllPlatters();
      console.log(items);
    };
    fetchPlatters();
  }, []);

  return (
    <SafeAreaView>
      <AutoScrollCarousel />
      <SignOutButton />
    </SafeAreaView>
  );
};

export default Main;
