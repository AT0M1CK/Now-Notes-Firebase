import React, { ReactNode, forwardRef } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export type TextInputProps = {
  type: "text" | "password" | "number";
  colorScheme: string;
  borderScheme: string;
  rounded: "xs" | "md" | "lg";
  placeHolder: string;
  variant?: "outline" | "filled" | "flushed" | "unstyled";
  Disabled?: boolean;
  readonly?: boolean;
  // required?: boolean;
  size: "lg" | "md" | "sm" | "xs";
  name?: string;
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  validationSchema?: {
    required?: boolean;
    requiredError?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: RegExp;
    patternError?: string;
  };
};

const borderScheme = {
  green: " border-2 border-green-400",
  white: " border ",
};

const colorScheme = {
  green: " text-black bg-green-300",
  white: " text-black bg-gray-100",
};

const radius = {
  xs: "rounded-xs",
  md: "rounded-md",
};

const size = {
  lg: "h-20",
  md: "h-16",
  sm: "h-12",
  xs: "h-10",
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <>
      <input
        className={`${(colorScheme as any)[props.colorScheme]} ${
          (radius as any)[props.rounded]
        } mt-3 w-full p-2 align-middle  text-md tracking-wide text-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400 ${
          (size as any)[props.size]
        } ${(borderScheme as any)[props.borderScheme]}`}
        type={props.type}
        disabled={props.Disabled}
        readOnly={props.readonly}
        // required={props.required}
        placeholder={props.placeHolder}
        {...props.register(props.name || "", props.validationSchema)}
      />
      {/* display errors div */}
      <div
        className=" my-2 text-sm text-red-600
      "
      >
        {props.error && props.error[props.name || ""]?.type === "required" && (
          <span>
            {props.validationSchema?.requiredError
              ? props.validationSchema?.requiredError
              : "Field cannot be empty"}
          </span>
        )}
        {props.error && props.error[props.name || ""]?.type === "minLength" && (
          <span>Should be at least {props.validationSchema?.minLength} </span>
        )}
        {props.error && props.error[props.name || ""]?.type === "pattern" && (
          <span>
            {props.validationSchema?.patternError
              ? props.validationSchema?.patternError
              : "Invalid pattern"}{" "}
          </span>
        )}
      </div>
    </>
  );
});

export default TextInput;
