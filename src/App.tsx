import { z } from "zod";
import { Form } from "./components/form";

const schema = z.object({
  name: z
    .string({ required_error: "O seu nome é obrigatório." })
    .min(1, "O seu nome é obrigatório."),
});

export default function App() {
  const handleRequestLoanSimulation = (values) => {
    console.log(values);
  };

  return (
    <Form
      formId={crypto.randomUUID()}
      schema={schema}
      onSubmit={handleRequestLoanSimulation}
    >
      <Form.Input name="name" />
      <Form.Button>Testando</Form.Button>
    </Form>
  );
}
