import { forwardRef, InputHTMLAttributes, LegacyRef, Ref } from "react";
import { useController, useFormContext } from "react-hook-form";
import InputMask, { ReactInputMask } from "react-input-mask";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  mask?: string;
}

const BaseInput = (
  { name, mask, ...rest }: InputProps,
  ref: Ref<HTMLInputElement> | LegacyRef<ReactInputMask>
) => {
  const placeholder = rest.placeholder && rest.placeholder.toUpperCase();

  const { control, formState } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-col">
      {mask ? (
        <InputMask
          {...rest}
          {...field}
          ref={ref as LegacyRef<ReactInputMask>}
          placeholder={placeholder}
          className="border border-border-500 rounded-md px-4 py-3"
          mask={mask}
        />
      ) : (
        <input
          {...rest}
          {...field}
          ref={ref as Ref<HTMLInputElement>}
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

export const Input = forwardRef<HTMLInputElement, InputProps>(BaseInput);
