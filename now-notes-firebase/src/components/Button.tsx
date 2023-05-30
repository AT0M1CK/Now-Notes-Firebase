import { ReactNode } from "react";
import Spinner from "./Spinner";

export type ButtonPropsType = {
  type: "submit" | "button" | "reset";
  key?: number;
  buttonId?: number;
  colorScheme: string;
  variant: string;
  lightIcon?: boolean;
  iconOnly?: boolean;
  iconPaddingFull?: boolean;
  justifyContent?: "start" | "between" | "end";
  icon?: ReactNode;
  isDisabled?: boolean;
  buttonSize?: "xs" | "sm" | "md" | "lg";
  shadowSize?: "xs" | "sm" | "md" | "lg" | "xl" | "normal" | "full" | "inner";
  isActive?: boolean;
  isLoading?: boolean;
  padding: "small" | "normal";
  fullWidth?: boolean;
  radius?: "xs" | "sm" | "md" | "lg" | "xl" | "normal" | "full" | "rightFull";
  children?: ReactNode;
  onClick?: () => void;
  customCssProps?: string;
};

const Button = (props: ButtonPropsType) => {
  const {
    type,
    iconOnly,
    isLoading,
    customCssProps,
    radius,
    variant,
    colorScheme,
    fullWidth,
    children,
    shadowSize,
    justifyContent,
    lightIcon,
    icon,
    iconPaddingFull,
    isDisabled,
    padding,
    buttonSize,
    onClick,
  } = props;

  const shadowSizes = {
    xs: "shadow-xs",
    sm: "shadow-sm",
    normal: "shadow",
    md: "shadow-md",
    inner: "shadow-inner",
    lg: "shadow-lg",
    xl: "shadow-xl",
    full: "shadow-2xl",
  };

  const buttonSizes = {
    xs: "text-xs ",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const paddings = {
    normal: "px-3 py-3",
    small: "px-2 py-1",
  };

  const borderRadius = {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    normal: "rounded",
    rightFull: "rounded-r-full",
  };

  const justifyContents = {
    start: "justify-start",
    between: "justify-between",
    end: "justify-end",
  };

  const colorSchemes = {
    blue: {
      bg_darker: "bg-blue-500",
      bg_lighter: "bg-blue-200",
      border: "border-blue-500 ",
      text_lighter: "text-white",
      text_darker: "text-blue-500",
      icon_lighter: "text-blue-200",
      hover_darker: " hover:bg-blue-400 ",
      hover_lighter: "hover:bg-blue-200",
      hover_text_lighter: "hover:text-blue-300",
    },
    white: {
      bg_darker: "bg-gray-900",
      bg_lighter: "bg-gray-200",
      border: "border-gray-900 ",
      text_lighter: "text-white",
      text_darker: "text-gray-900",
      icon_lighter: "text-gray-600",
      hover_darker: " hover:bg-gray-700 ",
      hover_lighter: "hover:bg-gray-200",
      hover_text_lighter: "hover:text-gray-500",
      fill_lighter: "fill-white",
      fill_darker: "fill-gray-900",
    },
  };

  const variants = {
    ghost: ` ${(colorSchemes as any)[colorScheme!].text_darker} ${
      !isDisabled && (colorSchemes as any)[colorScheme!].hover_lighter
    }`,
    iconOnly: ` ${(colorSchemes as any)[colorScheme!].text_darker} ${
      !isDisabled && (colorSchemes as any)[colorScheme!].hover_lighter
    } ${
      (colorSchemes as any)[colorScheme!].bg_lighter
    } text-slate-700 flex  text-xs shrink-0 `,
  };

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
        disabled={isDisabled}
        onClick={() => {
          if (onClick) onClick();
        }}
        className={` ${customCssProps} ${
          (variants as any)[variant]
        } flex items-center ${
          justifyContent
            ? `${(justifyContents as any)[justifyContent!]}`
            : "justify-center"
        } text-center  align-middle font-inter font-medium flex-row  ${
          (borderRadius as any)[radius!]
        } ${(shadowSizes as any)[shadowSize!]} ${
          (buttonSizes as any)[buttonSize!]
        } ${fullWidth && "w-full"}`}
      >
        <div
          className={`${
            iconOnly &&
            icon &&
            `${
              (paddings as any)[padding!]
            } items-center flex justify-center  text-center`
          } ${
            icon &&
            !iconOnly &&
            "pl-4 pr-2 py-3 items-center flex justify-center  text-center"
          } ${
            icon &&
            iconPaddingFull &&
            "pl-7 pr-9 py-3 items-center flex justify-center  text-center"
          } ${
            lightIcon
              ? `${(colorSchemes as any)[colorScheme!].icon_lighter}`
              : ""
          }`}
        >
          {isLoading && icon ? getSpinner() : icon}
        </div>
        {!iconOnly && (
          <div className={`${icon && "mr-4"} py-2 ${!icon && "px-3"}`}>
            {isLoading ? getSpinner() : children}
          </div>
        )}
      </button>
    </>
  );
};

export default Button;
