import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header(props: NativeStackHeaderProps) {
  const { navigation, route, options, back } = props;

  const title = options.headerTitle ?? options.title ?? route.name;

  return (
    <View
      style={{ height: 56, justifyContent: "center", paddingHorizontal: 16 }}
    >
      {back && (
        <TouchableOpacity onPress={navigation.goBack}>
          <Text>←</Text>
        </TouchableOpacity>
      )}

      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {typeof title === "string" ? title : route.name}
      </Text>
    </View>
  );
}
