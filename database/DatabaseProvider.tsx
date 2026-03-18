import Loader from "@/components/Loader";
import { useProgress } from "@/providers/ProgressProvider";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import { getDb } from "./db";
import { initDatabase, initDefaultWallets } from "./init";

const DatabaseContext = createContext(false);

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dbReady, setDbReady] = useState(false);
  const { setProgress } = useProgress();

  useEffect(() => {
    const init = async () => {
      try {
        setProgress(0.1);

        const db = await getDb();
        setProgress(0.3);

        await initDatabase(db);
        setProgress(0.6);

        await initDefaultWallets(db);
        setProgress(0.9);

        setDbReady(true);
        setProgress(1);
      } catch (e) {
        console.error("DB INIT FAILED", e);
      } finally {
        try {
          await SplashScreen.hideAsync();
        } catch {}
      }
    };

    init();
  }, []);

  if (!dbReady) {
    return <Loader />;
  }

  return (
    <DatabaseContext.Provider value={true}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabaseReady = () => {
  return useContext(DatabaseContext);
};
