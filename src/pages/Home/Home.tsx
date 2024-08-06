import { useSnackbar } from "notistack";
import { Form } from "../../components/form";
import { handleAxiosError, useFetch } from "../../hooks/use-fetch";
import {
  requestLoanSimulationSchema,
  requestLoanSimulationType,
} from "./schema";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [{ isFetching, error }, fetch] = useFetch("/loans/simulation", {
    method: "POST",
    manual: true,
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar(handleAxiosError(error), {
        variant: "error",
      });
    }
  }, [error, enqueueSnackbar]);

  const handleRequestLoanSimulation = async ({
    cpf,
    uf,
    birthday,
    loan,
    installment,
  }: requestLoanSimulationType) => {
    const response = await fetch({
      body: {
        cpf,
        uf,
        birthday,
        loan: Number(loan),
        installments: Number(installment),
      },
    });

    if (response) {
      navigate(`/${response.id}`);
    }
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
            schema={requestLoanSimulationSchema}
            onSubmit={handleRequestLoanSimulation}
          >
            <Form.Input name="cpf" placeholder="CPF" mask="999.999.999-99" />
            <Form.Select
              name="uf"
              placeholder="UF"
              options={[
                {
                  value: "SP",
                  label: "SP",
                },
                {
                  value: "MG",
                  label: "MG",
                },
                {
                  value: "ES",
                  label: "ES",
                },
                {
                  value: "RJ",
                  label: "RJ",
                },
              ]}
            />
            <Form.Input
              name="birthday"
              placeholder="Data de Nascimento"
              mask="99/99/9999"
            />
            <Form.Input
              name="loan"
              placeholder="Valor do Empréstimo"
              type="number"
              min={0}
            />
            <Form.Input
              name="installment"
              placeholder="Qual valor deseja pagar por mês?"
              min={0}
            />
            <Form.Button disabled={isFetching} isLoading={isFetching}>
              Simular
            </Form.Button>
          </Form>
        </section>
      </main>
    </>
  );
};

export { Home };
