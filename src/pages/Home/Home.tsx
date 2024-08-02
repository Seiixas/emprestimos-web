import { z } from "zod";
import { Form } from "../../components/form";

const schema = z.object({
  cpf: z
    .string({ required_error: "O seu nome é obrigatório." })
    .min(1, "O seu nome é obrigatório."),
  uf: z
    .enum(["SP", "MG", "BR"], { required_error: "O estado é obrigatório." })
    .refine((val) => ["SP", "MG", "BR"].includes(val), {
      message: "O estado deve ser 'SP', 'MG', ou 'BR'",
    }),
  birthday: z.string(), // TODO: Mudar para date
  loan: z
    .number({ required_error: "O valor do empréstimo é obrigatório." })
    .min(0)
    .max(50000, {
      message: "O valor do empréstimo deve ser menor que R$ 50.000,00",
    }),
  installment: z
    .number({
      required_error: "O valor da parcela é obrigatório.",
    })
    .min(0), // TODO: Validar porcentagem do valor total
});

const Home = () => {
  const handleRequestLoanSimulation = (values) => {
    console.log(values);
  };

  return (
    <>
      <main>
        <header className="flex flex-col items-center gap-8">
          <h1 className="text-[3.125rem] text-text-primary font-light	">
            Simule e solicite o seu empréstimo.
          </h1>
          <h2 className="font-bold">
            Preencha o formulário abaixo para simular
          </h2>
        </header>
        <section className="bg-white rounded-md shadow-[0px_0px_10px_0px_#ECECEC] p-8 mt-6">
          <Form
            formId={crypto.randomUUID()}
            schema={schema}
            onSubmit={handleRequestLoanSimulation}
          >
            <Form.Input name="cpf" placeholder="CPF" />
            <Form.Input name="uf" placeholder="UF" />
            <Form.Input name="birthday" placeholder="Data de Nascimento" />
            <Form.Input name="loan" placeholder="Valor do Empréstimo" />
            <Form.Input
              name="installment"
              placeholder="Qual valor deseja pagar por mês?"
            />
            <Form.Button>Simular</Form.Button>
          </Form>
        </section>
      </main>
    </>
  );
};

export { Home };
