import {
  ButtonHTMLAttributes,
  forwardRef,
  PropsWithChildren,
  Ref,
} from "react";
import cx from "classnames";

export interface ButtonProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

const BaseButton = (
  { children, variant = "primary", isLoading = false, ...rest }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  const styles = cx(
    "border border-border-500 rounded-md px-4 py-2 font-semibold text-white uppercase shadow-[0px_4px_4px_0px_#87878740] flex items-center justify-center gap-2",
    {
      "bg-orange-500": variant === "primary",
      "bg-green-500": variant === "secondary",
    }
  );
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <button {...rest} ref={ref} className={styles}>
        {children}
      </button>
      <span>
        {isLoading && (
          <span className="text-orange-500">
            <span>Carregando...</span>
          </span>
        )}
      </span>
    </div>
  );
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(BaseButton);
