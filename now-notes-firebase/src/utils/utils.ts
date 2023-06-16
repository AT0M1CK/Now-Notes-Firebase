import { auth } from "../firebase/firebaseConfig";

export const remotePath = {
  active: `/Notes/active`,
  archive:`/Notes/archive`,
  trash: `/Notes/trash`,
};

export type NoteManagerActivePath = {
  name: "ACTIVE" | "TRASH" | "ARCHIVE";
  path: string;
};