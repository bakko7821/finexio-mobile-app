import Loader from "@/components/Loader/Loader";
import { useProgress } from "@/providers/ProgressProvider";
import { useSettings } from "@/store/useSettings";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getDb } from "./db";
import { initDatabase, initDefaultWallets } from "./init";

const DatabaseContext = createContext(false);

const MIN_LOADER_TIME = 5000; // ms

export const DatabaseProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dbReady, setDbReady] = useState(false);
  const { setProgress } = useProgress();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return; // защита от повторного init
    didInit.current = true;

    const init = async () => {
      const startTime = Date.now();

      try {
        setProgress(0.1);

        const db = await getDb();
        setProgress(0.3);

        await initDatabase(db);
        setProgress(0.6);

        await initDefaultWallets(db);
        setProgress(0.8);

        await useSettings.getState().load();
        setProgress(0.9);

        const elapsed = Date.now() - startTime;

        if (elapsed < MIN_LOADER_TIME) {
          await new Promise((r) => setTimeout(r, MIN_LOADER_TIME - elapsed));
        }

        setDbReady(true);
        await SplashScreen.hideAsync();

        setProgress(1);
      } catch (e) {
        console.error("DB INIT FAILED", e);
      }
    };

    init();
  }, []);

  if (!dbReady) {
    return <Loader onFinish={() => setDbReady(true)} />;
  }

  return (
    <DatabaseContext.Provider value={true}>{children}</DatabaseContext.Provider>
  );
};

export const useDatabaseReady = () => {
  return useContext(DatabaseContext);
};
