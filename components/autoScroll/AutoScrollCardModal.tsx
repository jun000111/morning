import { PlatterDTO } from '@/dto/platter.dto';
import { IngredientBaseDTO } from '@/dto/ingredient.dto';
import { Modal, View, Text, Pressable } from 'react-native';

interface Props {
  visible: boolean;
  platter: PlatterDTO;
  onClose: () => void;
}

// Todo : allergy ingredients should have a red outline
export default function CardModal({ visible, platter, onClose }: Props) {
  const allIngredients = platter.ingredients.map(
    (ingredient: IngredientBaseDTO) => {
      return ingredient.name;
    }
  );
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-4/5 bg-white p-6 rounded-xl">
          <Text className="text-lg font-bold mb-2">{platter.name}</Text>
          <Text className="font-bold mb-4">Insert Image Here</Text>
          <Text className="text-base mb-4">{platter.description}</Text>
          <Text className="text-base mb-4">
            Ingredients : {allIngredients.join(' , ')}
          </Text>

          <Text className="font-bold">
            Calories : {platter.nutriSummary.calories}
          </Text>
          <Text className="font-bold">
            Carbs : {platter.nutriSummary.carbs}
          </Text>
          <Text className="font-bold">Fat : {platter.nutriSummary.fat}</Text>
          <Text className="font-bold">
            Fiber : {platter.nutriSummary.fiber.toPrecision(2)}
          </Text>
          <Text className="font-bold">
            Sodium : {platter.nutriSummary.sodium}
          </Text>
          <Text className="font-bold">
            Cholesterol : {platter.nutriSummary.cholesterol}
          </Text>

          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            className="bg-blue-500 py-2 px-4 rounded mt-4 "
          >
            <Text className="text-white text-center">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
