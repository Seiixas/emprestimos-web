import { forwardRef, InputHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: string; // Optional mask prop
}

const BaseInput = ({ name, mask, ...rest }: InputProps) => {
  const placeholder = rest.placeholder && rest.placeholder.toUpperCase();

  const { control, formState } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-col">
      {mask ? (
        <InputMask
          {...rest}
          {...field}
          placeholder={placeholder}
          className="border border-border-500 rounded-md px-4 py-3"
          mask={mask}
        />
      ) : (
        <input
          {...rest}
          {...field}
          placeholder={placeholder}
          className="border border-border-500 rounded-md px-4 py-3"
        />
      )}
      {!!formState.errors[name] && (
        <span className="text-error-500 text-sm p-1">
          {formState.errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export const Input = forwardRef(BaseInput);
