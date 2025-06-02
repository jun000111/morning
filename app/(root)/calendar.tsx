import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, Pressable } from 'react-native';
import { holidays } from '@/constants/holidays';
import { getCalenderPlatters } from '@/services/platterService';
import { CalendarPlatterDTO } from '@/dto/platter.dto';
import CardModal from '@/components/CardModal';
import { QUOTAS } from '@/constants/quota';
import { getCalendarBlock, setCalendarBlock } from '@/services/calendarService';
import { CalendarBlockDTO } from '@/dto/calendar.dot';

const rowHeight = Dimensions.get('window').height / 11;

const getFormattedDay = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString('en-CA', { weekday: 'short' });

const isDateBlockable = (dateStr: string) => {
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() + 14);
  return new Date(dateStr) > limit;
};

const BreakfastCalendar = () => {
  const [platters, setPlatters] = useState<CalendarPlatterDTO[]>();
  const [blocked, setBlocked] = useState<CalendarBlockDTO>();
  const [selectedPlatter, setSelectedPlatter] = useState<{
    platter: CalendarPlatterDTO;
    isBlockable: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      const res = await getCalenderPlatters();
      setPlatters(res);
    };
    fetchCalendar();

    const fetchBlockedDates = async () => {
      const res = await getCalendarBlock();
      console.log(res);
      setBlocked(res);
    };
    fetchBlockedDates();
  }, []);

  const openPlatterModal = (
    platter: CalendarPlatterDTO,
    isBlockable: boolean
  ) => {
    setSelectedPlatter({ platter, isBlockable });
  };

  const handleClose = () => setSelectedPlatter(null);

  const handleBlock = async (date: string) => {
    alert('clicked');

    try {
      await setCalendarBlock(date);
    } catch (e: any) {
      alert(e.response?.data?.error ?? 'hi');
    }
    const updatedBlocked = await getCalendarBlock();
    setBlocked(updatedBlocked);
    setSelectedPlatter(null);
  };

  return (
    <View>
      <ScrollView stickyHeaderIndices={[0]}>
        <View
          className="bg-yellow-200 justify-start items-center flex-row "
          style={{ height: rowHeight }}
        >
          <View className="flex-row">
            <Text className="px-2">{blocked?.currentMonthQuota.month}</Text>
            <Text className="px-2">
              {`${blocked?.currentMonthQuota.quota} / ${QUOTAS}`}
            </Text>
          </View>
          <View className="bg-yellow-200 justify-start items-center flex-row ">
            <Text className="px-2">{blocked?.nextMonthQuota.month}</Text>
            <Text className="px-2">
              {`${blocked?.nextMonthQuota.quota} / ${QUOTAS}`}
            </Text>
          </View>
        </View>
        {platters?.map((platter) => {
          const { date, name } = platter;
          const holiday = holidays[date];
          const isBlockable = isDateBlockable(date);
          const weekday = getFormattedDay(date);

          let bgColorClass = 'bg-white';

          if (holiday) {
            bgColorClass = 'bg-gray-700';
          } else if (!isBlockable) {
            bgColorClass = 'bg-blue-100';
          }

          if (blocked?.blockedDates.includes(platter.date)) {
            bgColorClass = 'bg-red-200';
          }

          return (
            <View
              key={date}
              style={{ height: rowHeight }}
              className={`justify-center border-b border-gray-300 px-4 ${bgColorClass}`}
            >
              {holiday ? (
                <>
                  <Text className="text-sm italic text-white">{date}</Text>
                  <Text className="text-white italic">🎉 {holiday}</Text>
                </>
              ) : (
                <Pressable
                  onPress={() => openPlatterModal(platter, isBlockable)}
                >
                  <Text className="text-md text-black">{`${weekday} ${date}`}</Text>
                  <Text className="text-base">🍳 {name}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>

      {selectedPlatter && (
        <CardModal
          key={selectedPlatter.platter.date} // forces re-render
          visible={true}
          platter={selectedPlatter.platter}
          onClose={handleClose}
          isBlockable={selectedPlatter.isBlockable}
          onBlock={handleBlock}
        />
      )}
    </View>
  );
};

export default BreakfastCalendar;
