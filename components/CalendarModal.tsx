import { CalendarPlatterDTO } from '@/dto/platter.dto';
import { Modal, View, Text } from 'react-native';

interface Props {
  visible: boolean;
  platter: CalendarPlatterDTO;
  onClose: () => void;
}

const CalenderModal = ({ visible, platter, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 p-6 rounded-xl">
          <Text>hi</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CalenderModal;
