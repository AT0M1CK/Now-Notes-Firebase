import { useState } from "react";
import TextInput from "./TextInput";
import { useForm } from "react-hook-form";

const NoteCreator = () => {
  const [isCreating, setIsCreating] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data);
    setValue("header", "");
    setValue("body", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col justify-center px-4 py-3 rounded-md items-center shadow-md border">
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
    </>
  );
};

export default NoteCreator;
