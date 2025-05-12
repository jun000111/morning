import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { holidays } from '@/constants/holidays';
import { getCalenderPlatters } from '@/services/platterService';
import { CalendarPlatterDTO } from '@/dto/platter.dto';

const BreakfastCalendar = () => {
  const [platters, setPlatters] = useState<CalendarPlatterDTO[]>();
  const screenHeight = Dimensions.get('window').height;
  const rowHeight = screenHeight / 10;

  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await getCalenderPlatters();
      setPlatters(res);
    };
    fetchCalendar();
  }, []);

  return (
    <ScrollView>
      {platters?.map((item) => {
        const breakfast = item.name;
        const holiday = holidays[item.date];

        return (
          <View
            key={item.date}
            style={{ height: rowHeight }}
            className={`justify-center border-b border-gray-300 px-4 ${
              holiday ? 'bg-gray-700' : ''
            }`}
          >
            {holiday ? (
              <View>
                <Text className={`text-sm italic text-white`}>{item.date}</Text>
                <Text className="text-white italic">🎉 {holiday}</Text>
              </View>
            ) : (
              <View>
                <Text className={`text-md text-black`}>{item.date}</Text>
                <Text className="text-base">🍳 {breakfast}</Text>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BreakfastCalendar;
