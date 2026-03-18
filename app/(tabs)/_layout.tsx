import { useTheme } from "@/hooks/useTheme";
import { getContrastColor } from "@/utils/colors";
import { TAB_ROUTES, TABS } from "@/utils/tabs";
import { Tabs, usePathname, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      initialRouteName="categories"
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
              const routePath = TAB_ROUTES[tab.name];
              const isActive = pathname === routePath;
              const Icon = tab.icon;

              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => router.push(routePath)}
                  style={{
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    />
  );
}
