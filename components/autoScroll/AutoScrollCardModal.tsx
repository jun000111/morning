import { useState } from 'react';
import { Modal, View, Text, Pressable } from 'react-native';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export default function CardModal({ visible, title, onClose }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 bg-white p-6 rounded-xl">
          <Text className="text-lg font-bold mb-2">Card Tapped</Text>
          <Text className="text-base mb-4">{title}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            className="bg-blue-500 py-2 px-4 rounded "
          >
            <Text className="text-white text-center">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
