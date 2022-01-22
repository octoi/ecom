import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function HomeScreen() {
  return (
    <View style={tw`p-10 bg-red-100 w-full`}>
      <Text>Hello World</Text>
    </View>
  );
}
