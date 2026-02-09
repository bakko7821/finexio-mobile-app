import React, { createContext, useContext, useState, useEffect } from "react";
import { getOrCreateUserId, fetchUserBalance } from "@/db/chart";

interface UserContextType {
  userId: string;
  balance: number;
  refreshBalance: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const refreshBalance = async () => {
    if (!userId) return;
    const money = await fetchUserBalance(userId);
    setBalance(money);
  };

  useEffect(() => {
    (async () => {
      const id = await getOrCreateUserId();
      setUserId(id);
      await refreshBalance();
    })();
  }, []);

  return (
    <UserContext.Provider value={{ userId, balance, refreshBalance }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
