import { forwardRef, Ref, SelectHTMLAttributes } from "react";
import { useController, useFormContext } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const BaseSelect = (
  { name, options, placeholder, ...rest }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const { control, formState } = useFormContext();
  const { field } = useController({ name, control });

  return (
    <div className="flex flex-col">
      <select
        {...rest}
        {...field}
        ref={ref}
        className="border border-border-500 rounded-md px-4 py-3"
        defaultValue={placeholder ? "placeholder" : field.value}
      >
        {placeholder && (
          <option value="placeholder" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {!!formState.errors[name] && (
        <span className="text-error-500 text-sm p-1">
          {formState.errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(BaseSelect);
