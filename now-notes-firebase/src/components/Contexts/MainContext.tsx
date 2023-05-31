import { createContext } from "react";

export type MainContextType = {
  title?: string;
  setTitle?: (title: string) => void;
};

export const MainContext = createContext<MainContextType>({});
