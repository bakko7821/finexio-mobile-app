import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { TAB_ROUTES, TABS } from "@/utils/tabs";
import { Tabs, useRouter, useSegments } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments() as string[];

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => (
        <View
          style={{ backgroundColor: theme.background }}
          className="relative p-4"
        >
          <View
            style={{ backgroundColor: theme.card }}
            className="overflow-hidden p-1 rounded-full flex-row items-center justify-between gap-2"
          >
            {TABS.map((tab) => {
              const isActive = segments.includes(tab.name);
              const Icon = tab.icon;
              const routePath = TAB_ROUTES[tab.name];

              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => router.replace(routePath)}
                  style={{
                    // flex: tab.name !== "settings" && isActive ? 1 : undefined,
                    backgroundColor: isActive ? theme.primary : "transparent",
                  }}
                  className="overflow-hidden flex-row rounded-full items-center justify-start gap-2 p-3"
                >
                  <Icon
                    width={36}
                    height={36}
                    color={
                      isActive ? getContrastColor(theme.primary) : theme.text
                    }
                  />
                  {/* {isActive && (
                    <Text
                      style={{
                        color: isActive
                          ? getContrastColor(theme.primary)
                          : theme.text,
                        fontWeight: isActive ? "600" : "400",
                      }}
                      className="text-base"
                    >
                      {tab.label}
                    </Text>
                  )} */}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    />
  );
}
