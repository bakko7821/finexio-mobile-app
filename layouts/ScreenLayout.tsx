import { View } from "react-native";
import { Nav } from "../components/Nav";

type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
  showNav?: boolean;
};

export function ScreenLayout({ header, children, showNav = true }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {header}

      <View style={{ flex: 1 }}>
        {children}
      </View>

      {showNav && <Nav />}
    </View>
  );
}
