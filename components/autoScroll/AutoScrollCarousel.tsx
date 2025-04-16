import React, { useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import CardModal from './AutoScrollCardModal';

const data = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
}));

const CARD_WIDTH = 120;
const SPACING = 10;
const SCROLL_STEP = 1;
const FPS_INTERVAL = 16;
const RESUME_DELAY = 800;

export default function AutoScrollCarousel() {
  const scrollRef = useRef<ScrollView>(null);
  const scrollPos = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const [selectedCard, setSelectdCard] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const onCardPress = (id: number, title: string) => {
    setSelectdCard({ id, title });
  };
  const handleOnCardClose = () => {
    setIsUserScrolling(false);
    setSelectdCard(null);
  };

  const startAutoScroll = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      scrollPos.current += SCROLL_STEP;

      scrollRef.current?.scrollTo({
        x: scrollPos.current,
        animated: false,
      });

      const maxScroll = (CARD_WIDTH + SPACING * 2) * data.length;

      if (scrollPos.current >= maxScroll) {
        scrollPos.current = 0;
        scrollRef.current?.scrollTo({ x: 0, animated: false });
      }
    }, FPS_INTERVAL);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollPos.current = event.nativeEvent.contentOffset.x;
  };

  useEffect(() => {
    if (isUserScrolling) {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    } else {
      resumeTimeoutRef.current = setTimeout(() => {
        startAutoScroll();
      }, RESUME_DELAY);
    }

    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [isUserScrolling]);

  return (
    <View className="mt-6 h-40 justify-items-center items-center">
      <ScrollView
        className="px-4"
        ref={scrollRef}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onTouchStart={() => setIsUserScrolling(true)}
        onScrollEndDrag={() => setIsUserScrolling(false)}
        onMomentumScrollEnd={() => setIsUserScrolling(false)}
        scrollEventThrottle={16}
      >
        {[...data, ...data].map((item, index) => (
          <Pressable
            className="w-40 h-full bg-gray-300 mx-2 justify-center items-center rounded-xl active:opacity-50"
            key={`${item.id}-${index}`}
            onPress={() => onCardPress(item.id, item.title)}
          >
            <View>
              <Text className="text-lg font-bold">{item.title}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
      {selectedCard ? (
        <CardModal
          visible={true}
          title={selectedCard.title}
          onClose={handleOnCardClose}
        />
      ) : null}
    </View>
  );
}
