import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TouchableOpacity, View, Text } from 'react-native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function Nav() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Category')}>
        <Text>Категории</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateNewCategory')}>
        <Text>46</Text>
      </TouchableOpacity>
    </View>
  );
}
