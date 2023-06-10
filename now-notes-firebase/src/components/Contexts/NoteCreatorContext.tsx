import { createContext } from "react";

export type NoteCreatorContextType = {
  deleteNote?: (id: string) => void;
};

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});
