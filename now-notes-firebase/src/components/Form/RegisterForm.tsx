import { useState } from "react";
import { LoginState } from "../Layout/LoginLayout";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput";
import { auth } from "../../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import MenuButton from "../MenuButton";
import { MdOutlineLogin } from "react-icons/md";

const RegisterForm = (props: { stateHandler: (state: LoginState) => void }) => {
  const [signUpError, setSignUpError] = useState({ error: false, msg: "" });
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    setError,
  } = useForm();

  const onFormSubmit = (data: any) => {
    console.log(data);
    signUp(data.email, data.password);
  };

  const signUp = async (email: string, password: string) => {
    setIsCreating(true);
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = newUser.user;
      console.log(user);
      props.stateHandler(LoginState.LOGIN);
      setIsCreating(false);
    } catch (error: any) {
      setSignUpError({ error: true, msg: error.message });
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className=" w-full flex justify-center text-center items-center my-5">
          <span>SIGN UP</span>
        </div>
        <div className=" justify-center w-full flex flex-col p-5 ">
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
          <div className="p-2">
            {" "}
            <TextInput
              type="password"
              colorScheme="white"
              rounded="md"
              size="xs"
              placeHolder="password"
              borderScheme="white"
              register={register}
              error={errors}
              name="password"
              validationSchema={{
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                patternError: "Invalid password.",
                requiredError: "Password cannot be empty",
              }}
            />
          </div>
          {/* error messages */}
          {signUpError.error && (
            <div className=" mb-2 text-center text-sm text-red-500">
              {signUpError.msg}
            </div>
          )}
          {/* <div className="flex text-red-500 justify-center text-center align-middle">
              <span>Error message</span>
            </div> */}
          {/* button */}

          {/* <button
            type="submit"
            className="bg-blue-500 rounded-md text-white p-2"
          >
            SUBMIT
          </button> */}
          <MenuButton
            type="submit"
            colorScheme="blue"
            radius="md"
            buttonSize="md"
            variant="solid"
            spinnerSize="sm"
            isLoading={isCreating}
            // leftIcon={<MdOutlineLogin size={23} />}
          >
            SIGN UP
          </MenuButton>
        </div>
        {/* links div */}
        <div className="flex w-full flex-col  justify-center items-center px-5 pb-5">
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Already have an account ?</span>
            <button
              onClick={() => {
                props.stateHandler(LoginState.LOGIN);
              }}
              className="text-blue-600 font-semibold px-2"
            >
              Login
            </button>
          </div>
          <div className="flex flex-row justify-center items-center text-center align-middle">
            <span>Trouble signing in ? </span>
            <button className="text-blue-600 font-semibold px-2">
              Click here
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
