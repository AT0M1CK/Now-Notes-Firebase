import { createContext } from "react";
import { Note } from "../Layout/MainLayout";

export type NoteCreatorContextType = {
  deleteNote?: (id: string) => void;
  changeColor?: (id: string, color: string) => void;
  archiveNote?: (id: string) => void;
  trashNote?: (id: string) => void;
  noteCreatorActiveHandler?: (newState: boolean) => void;
  noteColor?: string;
  notesList?: Note[];
};

export const NoteCreatorContext = createContext<NoteCreatorContextType>({});
