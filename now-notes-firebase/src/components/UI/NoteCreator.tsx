import { useEffect, useState } from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";
import { Note } from "../Layout/MainLayout";
import NoteList from "./NoteList";
import { ref, push, set, get, child, remove } from "firebase/database";
import { database } from "../../firebase/firebaseConfig";
import { NoteCreatorContext } from "../Contexts/NoteCreatorContext";

const NoteCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [notesList, setNotesList] = useState<Note[]>([]);
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
        color: "#ffffff",
      },
    };
    setNotesList([...notesList, note]);
    const noteListRef = ref(database, "/Notes/active");
    const newNoteRef = push(noteListRef);
    note.id = newNoteRef.key!;
    console.log(newNoteRef.key);
    set(newNoteRef, note);
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

  //Delete signle note
  const deleteSingleNote = async (id: string) => {
    const noteDeleteRef = ref(database, `/Notes/active/${id}`);
    try {
      await remove(noteDeleteRef);
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
    get(child(dbRef, "/Notes/active")).then((snapshot) => {
      if (snapshot.exists()) {
        const activeNotes = Object.values(snapshot.val());
        console.log(snapshot.val());
        setNotesList(activeNotes as Note[]);
      }
    });
  }, []);

  return (
    <>
      <NoteCreatorContext.Provider value={{ deleteNote: deleteSingleNote }}>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="flex flex-col mb-3 justify-center px-4 py-3 rounded-md items-center shadow-md border">
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
              )}{" "}
            </div>
          </form>
        </div>
        <div className="flex flex-wrap">
          <NoteList notes={notesList} />
        </div>
      </NoteCreatorContext.Provider>
    </>
  );
};

export default NoteCreator;
