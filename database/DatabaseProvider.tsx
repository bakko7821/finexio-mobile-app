import { createContext, useContext, useEffect, useState } from "react";
import { initOnce } from ".";
import { View } from "react-native";

const DatabaseContext = createContext<boolean>(false);

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initOnce();
        setDbReady(true);
      } catch (e) {
        console.error("DB INIT FAILED", e);
      }
    };

    init();
  }, []);

  if (!dbReady) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }

  return (
    <DatabaseContext.Provider value={true}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabaseReady = () => {
  return useContext(DatabaseContext);
};
