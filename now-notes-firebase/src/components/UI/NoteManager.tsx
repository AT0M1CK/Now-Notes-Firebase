import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";
import { Note, NoteManagerState } from "../Layout/MainLayout";
import NoteList from "./NoteList";
import { ref, push, set, get, child, remove, update } from "firebase/database";
import { auth, database } from "../../firebase/firebaseConfig";
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";
import { NoteManagerActivePath, remotePath } from "../../utils/utils";

const NoteManager = (props: { activePath: NoteManagerActivePath }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [notesList, setNotesList] = useState<Note[]>([]);

  // const [archiveNotesList, setArchiveNotesList] = useState<Note[]>([]);
  // const [userId, setUserId] = useState("");

  const { activePath } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  //   const noteList: Note[] = [
  //     {
  //       id: 1,
  //       content: {
  //         header: "Note 1",
  //         body: {
  //           bodyType: "plain",
  //           bodyContent: "Welcome to my first note",
  //         },
  //       },
  //       config: {
  //         color: "#bebebe",
  //       },
  //     },
  //     {
  //       id: 2,
  //       content: {
  //         header: "Note 2",
  //         body: {
  //           bodyType: "plain",
  //           bodyContent: "Welcome to my second note",
  //         },
  //       },
  //       config: {
  //         color: "#bebebe",
  //       },
  //     },
  //   ];

  const colorChangeHandler = (id: string, color: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        note.config.color = color;
        setNotesList(notesListCopy);
        const noteRef = ref(database, `/Notes/active/${note.id}`);
        update(noteRef, note);
      }
    });
  };

  const createNote = (header: string, description: string) => {
    const note: Note = {
      id: Math.random().toString(),
      content: {
        header: header,
        body: {
          bodyType: "plain",
          bodyContent: description,
        },
      },
      config: {
        color: "#ebd50e",
      },
    };
    setNotesList([...notesList, note]);
    // const path = "/" + userId + activePath.path;
    // console.log("path", path);

    const noteListRef = ref(database, activePath.path);
    const newNoteRef = push(noteListRef);
    note.id = newNoteRef.key!;
    console.log(newNoteRef.key);
    set(newNoteRef, note);
  };

  //Add note to archive
  // const archiveLocalNote = (id: string) => {
  //   const noteListCopy = [...notesList];
  //   noteListCopy.forEach((note) => {
  //     if (note.id === id) {
  //       setArchiveNotesList([...archiveNotesList, note]);
  //       console.log(archiveNotesList);
  //     }
  //   });
  // };

  //Archive single note from databse
  const archiveSingleNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        const noteCopy = Object.assign({}, note);
        const noteArchiveRef = ref(database, remotePath.archive);
        const newArchiveRef = push(noteArchiveRef);
        noteCopy.id = newArchiveRef.key!;
        console.log(newArchiveRef.key);
        set(newArchiveRef, noteCopy).then(() => {
          deleteSingleNote(id);
        });
      }
    });
  };

  const trashSingleNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note) => {
      if (note.id === id) {
        const noteCopy = Object.assign({}, note);
        const noteArchiveRef = ref(database, remotePath.trash);
        const newArchiveRef = push(noteArchiveRef);
        noteCopy.id = newArchiveRef.key!;
        console.log(newArchiveRef.key);
        set(newArchiveRef, noteCopy).then(() => {
          deleteSingleNote(id);
        });
      }
    });
  };

  //Delete note from local notes list
  const deleteLocalNote = (id: string) => {
    const notesListCopy = [...notesList];
    notesListCopy.forEach((note, index) => {
      if (note.id === id) {
        notesListCopy.splice(index, 1);
        setNotesList(notesListCopy);
      }
    });
  };

  //Update notes
  //Delete signle note
  const deleteSingleNote = async (id: string) => {
    const noteDeleteRef = ref(database, `/Notes/active/${id}`);
    try {
      await remove(noteDeleteRef);
      console.log("id:", id);
      deleteLocalNote(id);
    } catch (error) {
      console.log("Cannot delete note...");
    }
  };

  // const writeUserData = (header: string, description: string) => {
  //   set(ref(database, "/Notes"), {
  //     header: header,
  //     description: description,
  //   });
  // };

  const onFormSubmit = (data: any) => {
    console.log(data);
    createNote(data.header, data.body);
    setValue("header", "");
    setValue("body", "");
    // writeUserData(data.header, data.body);
  };

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, activePath.path)).then((snapshot) => {
      if (snapshot.exists()) {
        const activeNotes = Object.values(snapshot.val());
        console.log(snapshot.val());
        setNotesList(activeNotes as Note[]);
      }
    });
  }, [activePath]);

  // useEffect(() => {
  //   const user = auth.currentUser;
  //   if (auth.currentUser) setUserId(auth.currentUser?.uid);
  //   console.log("user", user);
  // }, [auth.currentUser]);

  return (
    <>
      <NoteCreatorContext.Provider
        value={{
          deleteNote: deleteSingleNote,
          changeColor: colorChangeHandler,
          archiveNote: archiveSingleNote,
          trashNote: trashSingleNote,
        }}
      >
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            {activePath.name === "ACTIVE" && (
              <div className="flex flex-col mb-3 justify-center px-4 py-3 rounded-md items-center shadow-md border">
                <div>
                  {!isCreating && (
                    <div
                      className="flex justify-start font-medium"
                      onClick={() => {
                        setIsCreating(true);
                      }}
                    >
                      Create Note...
                    </div>
                  )}
                  {isCreating && (
                    <div>
                      <TextInput
                        type="text"
                        colorScheme="white"
                        rounded="md"
                        size="xs"
                        placeHolder="Title"
                        borderScheme="white"
                        register={register}
                        error={errors}
                        name="header"
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "Invalid password.",
                          requiredError: "Password cannot be empty",
                        }}
                      />
                      <TextInput
                        type="text"
                        colorScheme="white"
                        rounded="md"
                        size="xs"
                        placeHolder="Description"
                        borderScheme="white"
                        register={register}
                        error={errors}
                        name="body"
                        validationSchema={{
                          required: false,
                          // pattern:
                          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          patternError: "Invalid password.",
                          requiredError: "Password cannot be empty",
                        }}
                      />
                      <button type="submit" className="">
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
        <div className="flex flex-wrap">
          <NoteList notes={notesList} />
        </div>
      </NoteCreatorContext.Provider>
    </>
  );
};

export default NoteManager;
