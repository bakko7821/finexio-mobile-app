import { useTheme } from "@/hooks/useTheme";
import { withOpacity } from "@/utils/colors";
import { TAB_PATHNAMES, TAB_ROUTES, TABS } from "@/utils/tabs";
import { Tabs, usePathname, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function TabsLayout() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      screenOptions={{ headerShown: false, animation: "none" }}
      tabBar={(props) => (
        <View
          style={{ backgroundColor: theme.background }}
          className="relative p-4"
        >
          <View
            style={{ backgroundColor: theme.card }}
            className="overflow-hidden p-1 rounded-full flex-row items-center"
          >
            {TABS.map((tab) => {
              const routePath = TAB_ROUTES[tab.name]; // для router
              const uiPath = TAB_PATHNAMES[tab.name]; // для pathname
              const isActive = pathname === uiPath;

              const Icon = tab.icon;

              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => router.replace(routePath)}
                  style={{
                    backgroundColor: isActive
                      ? withOpacity(theme.primary, 0.3)
                      : "transparent",
                  }}
                  className="flex-col flex-1 rounded-full items-center justify-center gap-1 p-2"
                >
                  <Icon
                    width={36}
                    height={36}
                    color={isActive ? theme.primary : theme.text}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
    >
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="transactions" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="settings/index" />
    </Tabs>
  );
}
