import {
  DefaultValues,
  FieldValues,
  FormProvider,
  Path,
  useForm,
} from "react-hook-form";
import { ZodSchema } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./input";
import { Button } from "./button";

type FormProps<T> = {
  formId?: string;
  onSubmit: (values: T) => void;
  schema?: ZodSchema;
  defaultValues?: DefaultValues<T>;
  children:
    | ((props: {
        reset: (values: T) => void;
        setValue: (key: Path<T>, value: any) => void;
      }) => React.ReactNode)
    | React.ReactNode;
};

export const Form = <T extends FieldValues>(props: FormProps<T>) => {
  const { children, onSubmit, formId, schema, defaultValues } = props;
  const form = useForm<T>({
    resolver: schema && zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        {typeof children === "function"
          ? children({
              reset: (values) => form.reset(values),
              setValue: form.setValue,
            })
          : children}
      </form>
    </FormProvider>
  );
};

Form.Input = Input;
Form.Button = Button;
