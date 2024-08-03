import { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from "react";

interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: "primary" | "secondary";
}

const BaseButton = ({
  children,
  variant = "primary",
  ...rest
}: ButtonProps) => {
  const styles =
    variant === "primary"
      ? "border-border-500 rounded-md px-4 py-2 bg-orange-500 font-semibold text-white uppercase shadow-[0px_4px_4px_0px_#87878740] flex items-center justify-center gap-2"
      : "border-border-500 rounded-md px-4 py-2 bg-green-500 font-semibold text-white uppercase shadow-[0px_4px_4px_0px_#87878740] flex items-center justify-center gap-2";

  return (
    <button {...rest} className={styles}>
      {children}
    </button>
  );
};

export const Button = forwardRef(BaseButton);
