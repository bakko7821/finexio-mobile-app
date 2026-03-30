import { useTheme } from "@/hooks/useTheme";
import { useSettings } from "@/store/useSettings";
import { themeOptions } from "@/utils/configs/themes";
import { useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

export default function ThemeSelector() {
  const theme = useTheme();
  const { theme: selectedTheme, setTheme } = useSettings();

  const [loadingThemeId, setLoadingThemeId] = useState<string | null>(null);

  const handlePress = async (themeId: (typeof themeOptions)[number]["id"]) => {
    try {
      setLoadingThemeId(themeId);
      await setTheme(themeId);
    } finally {
      setLoadingThemeId(null);
    }
  };

  return (
    <View
      className="flex-row flex-wrap gap-2 p-4"
      style={{ backgroundColor: theme.card }}
    >
      {themeOptions.slice(3).map((item) => {
        const isActive = selectedTheme === item.id;
        const isLoading = loadingThemeId === item.id;

        return (
          <TouchableOpacity
            onPress={() => handlePress(item.id)}
            key={item.id}
            className="p-2 rounded-2xl flex-col gap-2 relative"
            style={{
              backgroundColor: item.preview.background,
              borderWidth: 2,
              borderColor: isActive ? theme.primary : "transparent",
            }}
          >
            <View
              className="p-2 rounded-2xl"
              style={{ backgroundColor: item.preview.card }}
            />
            <View
              className="p-1 rounded-2xl"
              style={{ backgroundColor: item.preview.card }}
            >
              <View
                className="p-2 w-10 rounded-lg"
                style={{ backgroundColor: item.preview.text }}
              />
            </View>

            <View className="absolute inset-0 items-center justify-center">
              {isLoading && (
                <ActivityIndicator size="large" color={theme.primary} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  //   return (
  //     <View style={{ gap: 12 }} className="bg-red-300">
  //       {themeOptions.map((item) => {
  //         const isActive = selectedTheme === item.id;
  //         const isLoading = loadingThemeId === item.id;

  //         return (
  //           <TouchableOpacity
  //             key={item.id}
  //             activeOpacity={0.8}
  //             onPress={() => handlePress(item.id)}
  //             style={{
  //               borderRadius: 20,
  //               padding: 14,
  //               backgroundColor: theme.card,
  //               borderWidth: 2,
  //               borderColor: isActive ? theme.primary : theme.header,
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "center",
  //                 gap: 12,
  //               }}
  //             >
  //               <View
  //                 style={{
  //                   width: 52,
  //                   height: 52,
  //                   borderRadius: 16,
  //                   backgroundColor: item.preview.background,
  //                   padding: 6,
  //                   justifyContent: "space-between",
  //                 }}
  //               >
  //                 <View
  //                   style={{
  //                     height: 10,
  //                     borderRadius: 999,
  //                     backgroundColor: item.preview.text,
  //                     opacity: 0.9,
  //                   }}
  //                 />
  //                 <View
  //                   style={{
  //                     height: 18,
  //                     borderRadius: 10,
  //                     backgroundColor: item.preview.card,
  //                   }}
  //                 />
  //               </View>

  //               <View style={{ flex: 1 }}>
  //                 <Text
  //                   style={{
  //                     color: theme.text,
  //                     fontSize: 16,
  //                     fontWeight: "600",
  //                   }}
  //                 >
  //                   {item.name}
  //                 </Text>

  //                 <Text
  //                   style={{
  //                     color: theme.secondary,
  //                     fontSize: 13,
  //                     marginTop: 2,
  //                   }}
  //                 >
  //                   {item.id}
  //                 </Text>
  //               </View>

  //               {isLoading ? (
  //                 <ActivityIndicator size="small" color={theme.primary} />
  //               ) : (
  //                 <View
  //                   style={{
  //                     width: 18,
  //                     height: 18,
  //                     borderRadius: 999,
  //                     borderWidth: 2,
  //                     borderColor: isActive ? theme.primary : theme.secondary,
  //                     backgroundColor: isActive ? theme.primary : "transparent",
  //                   }}
  //                 />
  //               )}
  //             </View>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   );
}
