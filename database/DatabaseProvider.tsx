import { createContext, useContext, useEffect, useState } from "react";
import { initDatabase } from "./init";

const DatabaseContext = createContext<boolean>(false);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setReady(true))
      .catch(console.error);
  }, []);

  if (!ready) return null; // Splash / Loader

  return (
    <DatabaseContext.Provider value={true}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseReady = () => {
  return useContext(DatabaseContext);
};
