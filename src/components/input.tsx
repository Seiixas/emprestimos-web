import { forwardRef, InputHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const BaseInput = ({ name, ...rest }: InputProps) => {
  const placeholder = rest.placeholder && rest.placeholder.toUpperCase();

  const { control, formState } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-col">
      <input
        {...rest}
        {...field}
        placeholder={placeholder}
        className="border-2 border-border-500 rounded-md px-4 py-2"
      />
      {!!formState.errors[name] && (
        <span className="text-error-500 text-sm">
          {formState.errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export const Input = forwardRef(BaseInput);
