import React, { ReactNode } from "react";
import Spinner from "./Spinner";

export type MenuButtonPropsType = {
  type: "button" | "submit" | "reset";
  title?: string;
  colorScheme?: string;
  customCssProps?: string;
  variant: string;
  shadow?: "xs" | "sm" | "md" | "lg" | "xl" | "normal" | "full" | "inner";
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "normal" | "full";
  isActive?: boolean;
  buttonSize?: "xs" | "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  spinnerSize?: "xs" | "sm" | "md";
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  isDisabled?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
  onClick?: () => void;
};

const MenuButton = (props: MenuButtonPropsType) => {
  const {
    type,
    title,
    variant,
    colorScheme,
    onClick,
    children,
    radius,
    leftIcon,
    rightIcon,
    shadow,
    buttonSize,
    customCssProps,
    disabled,
    isActive,
    isDisabled,
    fullWidth,
    isLoading,
    spinnerSize,

    iconOnly,
  } = props;

  const colorSchemes = {
    blue: {
      bg_darker: "bg-blue-500",
      bg_lighter: "bg-blue-200",
      border: "border-blue-500 ",
      text_lighter: "text-white",
      text_darker: "text-blue-500",
      hover_darker: " hover:bg-blue-400 ",
      hover_lighter: "hover:bg-blue-200",
      hover_text_lighter: "hover:text-blue-300",
      spinner_color: { bg: "text-blue-", fill: "" },
    },
    green: {
      bg_darker: "bg-green-500",
      bg_lighter: "bg-green-200",
      border: "border-green-500 ",
      text_lighter: "text-white",
      text_darker: "text-green-500",
      hover_darker: " hover:bg-green-400 ",
      hover_lighter: "hover:bg-green-100",
      hover_text_lighter: "hover:text-green-300",
      fill_lighter: "fill-white",
      fill_darker: "fill-green-500",
    },
    black: {
      bg_darker: "bg-gray-900",
      bg_lighter: "bg-gray-200",
      border: "border-gray-900 ",
      text_lighter: "text-white",
      text_darker: "text-gray-900",
      hover_darker: " hover:bg-gray-700 ",
      hover_lighter: "hover:bg-gray-300",
      hover_text_lighter: "hover:text-gray-500",
      fill_lighter: "fill-white",
      fill_darker: "fill-gray-900",
    },
  };

  /**
   * Available variants. Variants are built by combining colorschemes
   *
   */
  const variants = {
    outline: ` border  ${(colorSchemes as any)[colorScheme!].text_darker} ${
      !disabled && (colorSchemes as any)[colorScheme!].hover_lighter
    } ${(colorSchemes as any)[colorScheme!].border}`,
    solid: `  ${(colorSchemes as any)[colorScheme!].bg_darker} ${
      (colorSchemes as any)[colorScheme!].text_lighter
    } ${!disabled && (colorSchemes as any)[colorScheme!].hover_darker} `,
    link: `  ${
      (colorSchemes as any)[colorScheme!].text_darker
    } hover:underline hover:cursor-pointer ${
      iconOnly &&
      !disabled &&
      (colorSchemes as any)[colorScheme!].hover_text_lighter
    }`,
    ghost: ` ${(colorSchemes as any)[colorScheme!].text_darker} ${
      !disabled && (colorSchemes as any)[colorScheme!].hover_lighter
    }`,
    iconOnly: ` ${(colorSchemes as any)[colorScheme!].text_darker} ${
      !disabled && (colorSchemes as any)[colorScheme!].hover_lighter
    } ${
      (colorSchemes as any)[colorScheme!].bg_lighter
    } text-slate-700 flex  text-xs shrink-0 `,
  };

  /**
   * Button radius
   */
  const borderRadius = {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    normal: "rounded",
  };

  /**
   * Button sizes
   */

  const buttonSizes = {
    xs: "text-xs ",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  /**
   * Loading spinner sizes
   */

  const spinnerSizes = {
    xs: " w-4 h-4 ",
    sm: " w-6 h-6",
    md: " w-8 h-8 ",
  };

  /**
   * Button shadow
   */
  const shadowSize = {
    xs: "shadow-xs",
    sm: "shadow-sm",
    normal: "shadow",
    md: "shadow-md",
    inner: "shadow-inner",
    lg: "shadow-lg",
    xl: "shadow-xl",
    full: "shadow-2xl",
  };

  /**
   * function to render loading spinner
   * @returns
   */

  const getSpinner = () => {
    return (
      <>
        {/* <svg
          aria-hidden="true"
          className={` ${(spinnerSizes as any)[spinnerSize!]} ${
            (colorSchemes as any)[colorScheme!].text_lighter
          } animate-spin ${(colorSchemes as any)[colorScheme!].fill_darker}`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg> */}
        <Spinner size={buttonSize} />
      </>
    );
  };

  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={() => {
          if (onClick) onClick();
        }}
        className={` ${customCssProps} ${
          (variants as any)[variant]
        } flex items-center justify-center text-center  align-middle font-inter font-medium flex-row  ${
          (borderRadius as any)[radius!]
        } ${(shadowSize as any)[shadow!]} ${
          (buttonSizes as any)[buttonSize!]
        } ${fullWidth && "w-full"}`}
      >
        {/* left icon */}

        <div
          className={`${
            iconOnly &&
            leftIcon &&
            "px-3 py-3 items-center flex justify-center  text-center"
          } ${
            leftIcon &&
            !iconOnly &&
            "pl-4 pr-2 py-3 items-center flex justify-center  text-center"
          }`}
        >
          {isLoading && leftIcon ? getSpinner() : leftIcon}
        </div>

        {/* children */}

        {!iconOnly && (
          <div
            className={`${rightIcon && "ml-4"} ${leftIcon && "mr-4"} py-2 ${
              !leftIcon && !rightIcon && "px-3"
            }`}
          >
            {isLoading && !leftIcon && !rightIcon ? getSpinner() : children}
          </div>
        )}

        {/* right icon */}

        <div
          className={`${
            iconOnly &&
            rightIcon &&
            "px-3 py-3 items-center flex justify-center  text-center"
          } ${
            rightIcon &&
            !iconOnly &&
            "pr-4 pl-2 py-3 items-center flex justify-center  text-center"
          }`}
        >
          {isLoading && rightIcon ? getSpinner() : rightIcon}
        </div>
      </button>
    </>
  );
};

export default MenuButton;
