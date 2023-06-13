import { createContext } from "react";

export type NoteCreatorContextType = {
  deleteNote?: (id: string) => void;
  noteColor?: string;
};

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});
