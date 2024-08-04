import { useSnackbar } from "notistack";
import { Form } from "../../components/form";
import { useFetch } from "../../hooks/use-fetch";
import {
  requestLoanSimulationSchema,
  requestLoanSimulationType,
} from "./schema";
import { useEffect } from "react";

const Home = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [{ isFetching, error }, fetch] = useFetch("/loans/simulation", {
    method: "POST",
    manual: true,
  });

  const handleRequestLoanSimulation = async ({
    cpf,
    uf,
    birthday,
    loan,
    installment,
  }: requestLoanSimulationType) => {
    await fetch({
      body: {
        cpf,
        uf,
        birthday,
        loan: Number(loan), // TODO: Refatorar para usar o zod para fazer a conversão
        installments: Number(installment),
      },
    });
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar("Ocorreu um erro ao solicitar o empréstimo", {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);

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
            schema={requestLoanSimulationSchema}
            onSubmit={handleRequestLoanSimulation}
          >
            <Form.Input name="cpf" placeholder="CPF" />
            <Form.Input name="uf" placeholder="UF" />
            <Form.Input name="birthday" placeholder="Data de Nascimento" />
            <Form.Input
              name="loan"
              placeholder="Valor do Empréstimo"
              type="number"
            />
            <Form.Input
              name="installment"
              placeholder="Qual valor deseja pagar por mês?"
            />
            <Form.Button disabled={isFetching}>Simular</Form.Button>
          </Form>
        </section>
      </main>
    </>
  );
};

export { Home };
