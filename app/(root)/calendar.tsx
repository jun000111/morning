import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { holidays } from '@/constants/holidays';
import { getCalenderPlatters } from '@/services/platterService';
import { CalendarPlatterDTO } from '@/dto/platter.dto';
import CalenderModal from '@/components/CalendarModal';
import CardModal from '@/components/autoScroll/AutoScrollCardModal';

const BreakfastCalendar = () => {
  const [platters, setPlatters] = useState<CalendarPlatterDTO[]>();
  const [selectedPlatter, setSelectedPlatter] =
    useState<CalendarPlatterDTO | null>(null);
  const screenHeight = Dimensions.get('window').height;
  const rowHeight = screenHeight / 10;

  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await getCalenderPlatters();
      setPlatters(res);
    };
    fetchCalendar();
  }, []);

  const handlePlatterPress = (platter: CalendarPlatterDTO) => {
    setSelectedPlatter(platter);
  };

  const handleOnClose = () => {
    setSelectedPlatter(null);
  };

  return (
    <View>
      <ScrollView>
        {platters?.map((item) => {
          const breakfast = item.name;
          const holiday = holidays[item.date];

          const today = new Date();
          const blockableDay = new Date(today);
          blockableDay.setDate(today.getDate() + 14);

          // Convert both to YYYY-MM-DD format
          const itemDateStr = new Date(item.date).toISOString().split('T')[0];
          const blockableDateStr = blockableDay.toISOString().split('T')[0];
          const isBlockable = itemDateStr <= blockableDateStr;
          return (
            <View
              key={item.date}
              style={{ height: rowHeight }}
              className={`justify-center border-b border-gray-300 px-4 ${
                holiday
                  ? 'bg-gray-700'
                  : isBlockable
                  ? 'bg-blue-100'
                  : 'bg-white'
              }`}
            >
              {holiday ? (
                <View>
                  <Text className={`text-sm italic text-white`}>
                    {item.date}
                  </Text>
                  <Text className="text-white italic">🎉 {holiday}</Text>
                </View>
              ) : (
                <Pressable onPress={() => handlePlatterPress(item)}>
                  <Text className={`text-md text-black`}>{item.date}</Text>
                  <Text className="text-base">🍳 {breakfast}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>
      {selectedPlatter ? (
        <CardModal
          visible={true}
          platter={selectedPlatter}
          onClose={handleOnClose}
          calendar={true}
        />
      ) : null}
    </View>
  );
};

export default BreakfastCalendar;
