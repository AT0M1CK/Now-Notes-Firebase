import React, { useState } from "react";

export enum LoginState {
  LOGIN,
  FIRST_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  REGISTER,
}

const LoginPage = () => {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.LOGIN);

  const stateChangeHandler = (newState: LoginState) => {
    setLoginState(newState);
  };

  return (
    <>
      <div className="min-h-screen flex font-inter">
        <div className="flex-1 ...">
          <div className="flex flex-row min-h-screen shadow-inner bg-slate-500 justify-center items-center">
            <div className="flex flex-col h-128 w-128 p-10 md:w-128 sm:w-96 m-10  justify-between rounded-lg shadow-xl items-center bg-gray-200">
              {/* span div */}

              {/* input div  */}
              {loginState === LoginState.LOGIN ? "LOGIN FORM" : ""}
              {loginState === LoginState.REGISTER ? "REGISTER FORM" : " "}
              {loginState === LoginState.RESET_PASSWORD ? "RESET FORM" : ""}
            </div>
          </div>
        </div>
        <div className="flex-1 ...">
          <div className="flex min-h-screen bg-slate-200 justify-center shadow-2xl items-center">
            {/* <img src="/assets/CoverImage.jpg" alt="Cover" /> */}
            {/* <Image
              className=" h-screen w-screen"
              src={Cover5}
              width={500}
              height={500}
              alt="Picture of the author"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
