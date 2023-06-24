import Button from "./UI/Button";
import { TbPinned } from "react-icons/tb";
import TextInput from "./UI/TextInput";
import { ref, push, set, get, child, remove, update } from "firebase/database";

import { useForm } from "react-hook-form";
import { database } from "../firebase/firebaseConfig";
import { Note } from "./Layout/MainLayout";
import { useState } from "react";

const NoteMaker = () => {
  const [notesList, setNotesList] = useState<Note[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data);
    createNote(data.header, data.body);
    setValue("header", "");
    setValue("body", "");
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

    const noteListRef = ref(database, `/Notes/active/`);
    const newNoteRef = push(noteListRef);
    note.id = newNoteRef.key!;
    console.log(newNoteRef.key);
    set(newNoteRef, note);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div
          className="flex w-64 border border-gray-200 group hover:shadow-md py-2 px-3 m-2 flex-col rounded-md justify-center"
          style={{ backgroundColor: "#ffbebe" }}
        >
          <div className="flex flex-row justify-between items-center align-middle py-2 font-medium">
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
                isNoteInput={true}
                validationSchema={{
                  required: false,
                  // pattern:
                  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  patternError: "Invalid password.",
                  requiredError: "Password cannot be empty",
                }}
              />
            </div>
            <div className="invisible group-hover:visible">
              <Button
                customCssProps=" text-gray-600 "
                type="button"
                colorScheme="white"
                radius="full"
                variant="ghost"
                padding="rounded"
                buttonSize="lg"
                iconOnly
                icon={<TbPinned size={23} />}
              ></Button>
            </div>
          </div>
          <div className="flex text-gray-800 pb-1 font-base">
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
              isNoteInput={true}
              validationSchema={{
                required: false,
                // pattern:
                //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                patternError: "Invalid password.",
                requiredError: "Password cannot be empty",
              }}
            />
          </div>
          <div className="flex text-gray-800 pb-1 font-base">
            <span className="border mt-2 mb-0.5 border-gray-400 px-1 bg-gray text-xs rounded-full">
              tags
            </span>
          </div>
          <div className="mt-1 flex justify-between transition group-hover:visible invisible flex-row">
            {/* <ActionPanel {...SingleNote} /> */}
            {/* drop down actions */}
            <button type="submit">submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default NoteMaker;
