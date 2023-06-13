import { createContext } from "react";
import { Note } from "../Layout/MainLayout";

export type NoteCreatorContextType = {
  deleteNote?: (id: string) => void;
  changeColor?: (id: string, color: string) => void;
  noteColor?: string;
  notesList?: Note[];
};

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});
