import React, { ReactNode } from "react";
import Spinner from "./UI/Spinner";

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
