import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {}

const BaseButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className="border-border-500 rounded-md px-4 py-2 bg-orange-500 font-semibold text-white uppercase shadow-[0px_4px_4px_0px_#87878740]"
    >
      {children}
    </button>
  );
};

export const Button = forwardRef(BaseButton);
