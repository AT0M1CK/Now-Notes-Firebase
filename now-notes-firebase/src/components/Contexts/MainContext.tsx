import { createContext } from "react";

export type MainContextType = {
  title?: string;
  userId?: string;
  setUserId?: (userId: string) => void;
  setTitle?: (title: string) => void;
};

export const MainContext = createContext<MainContextType>({});
