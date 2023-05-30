import { useState } from "react";
import { LoginState } from "../Layout/LoginLayout";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import TextInput from "../UI/TextInput";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebaseConfig";
import MenuButton from "../MenuButton";

const ResetForm = (props: { stateHandler: (newState: LoginState) => void }) => {
  const [resetInProgress, setResetInProgress] = useState(false);
  const [resetMailSend, setResetMailSend] = useState(false);
  const [resetError, setResetError] = useState({ error: false, msg: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    setError,
  } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data);
    sendMail(data.email);
  };

  const sendMail = async (email: string) => {
    try {
      const user = await sendPasswordResetEmail(auth, email);
      // router.replace("/");
      console.log(user);
      setResetInProgress(true);
      setResetMailSend(true);
      setTimeout(() => {
        props.stateHandler(LoginState.LOGIN);
      }, 3000);
    } catch (error: any) {
      setResetError({ error: true, msg: error.message });
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className=" w-full flex justify-center text-center items-center my-5">
          <span>SEND EMAIL</span>
        </div>
        <div className=" justify-center w-full flex flex-col p-2 ">
          <div className="p-2">
            <TextInput
              type="text"
              colorScheme="white"
              rounded="md"
              size="xs"
              placeHolder="email"
              borderScheme="white"
              register={register}
              error={errors}
              name="email"
              validationSchema={{
                required: true,
                //pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                patternError: "Invalid email.",
                requiredError: "Email cannot be empty",
              }}
            />
          </div>

          {/* error messages */}
          {resetError.error && (
            <div className=" mb-2 text-center text-sm text-red-500">
              {resetError.msg}
            </div>
          )}
          {/* button */}
          <MenuButton
            type="submit"
            colorScheme="blue"
            radius="md"
            buttonSize="md"
            variant="solid"
            spinnerSize="sm"
            // isLoading={resetInProgress}
            // leftIcon={<MdOutlineLogin size={23} />}
          >
            RESET
          </MenuButton>
        </div>
        {/* links div */}
        <div className="flex w-full flex-col justify-center items-center p-2 my-2">
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Dont have an account ?</span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.REGISTER);
              }}
              className="text-blue-600 font-semibold px-2"
            >
              Sign Up
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Already have an account ? </span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.LOGIN);
              }}
              className="text-blue-600 font-semibold px-2"
            >
              Click here
            </button>
          </div>
        </div>
        {resetMailSend && (
          <div className="flex flex-col w-72 justify-center items-center text-white font-inter p-2 mb-2 mt-0.5 mx-2 bg-sky-600">
            <span className="text-center align-middle">
              A password reset link has been sent to your mail
            </span>
          </div>
        )}
      </form>
    </>
  );
};

export default ResetForm;
