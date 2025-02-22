import { ButtonHTMLAttributes } from "react";
import { classNamesMap } from "./button.util";
import { ButtonStyleType } from "./button.d";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  styletype?: ButtonStyleType;
  loading?: boolean;
}

export default function Button({
  styletype = ButtonStyleType.PRIMARY,
  loading,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={`rounded-lg hover:opacity-75 active:opacity-95 px-2 cursor-pointer border-[1px] ${classNamesMap[styletype]} ${className}`}
    >
      {props.children}
    </button>
  );
}
