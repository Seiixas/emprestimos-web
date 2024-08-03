import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Header, Table } from "../../components/table";
import ArrowIcon from "../../assets/arrow.svg";
import { useFetch } from "../../hooks/use-fetch";

interface LoanSimulator {
  outstanding_balance: string;
  fees: string;
  outstanding_balance_adjusted: string;
  installment_value: string;
  due_date: string;
}

const tableHeaders: Header<LoanSimulator>[] = [
  { label: "Saldo Devedor", key: "outstanding_balance" },
  { label: "Juros", key: "fees" },
  { label: "Saldo Devedor Ajustado", key: "outstanding_balance_adjusted" },
  { label: "Valor da Parcela", key: "installment_value" },
  { label: "Vencimento", key: "due_date" },
];

const data: LoanSimulator[] = [
  {
    outstanding_balance: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(60000),
    fees: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(1000),
    outstanding_balance_adjusted: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(61000),
    installment_value: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(15500),
    due_date: "10/10/2021",
  },
];

const Simulation = () => {
  const { simulationId } = useParams<{ simulationId: string }>();

  const [{ data: loans }] = useFetch<LoanSimulator>(
    `/loan-simulations/${simulationId}`,
    {
      method: "GET",
    }
  );

  return (
    <>
      <main>
        <header className="flex flex-col items-center gap-8">
          <h1 className="font-bold">
            Veja a simulação para o seu empréstimo antes de efetivar
          </h1>
        </header>
        <section className="bg-white rounded-md shadow-[0px_0px_10px_0px_#ECECEC] p-8 mt-6">
          <article className="grid grid-cols-3 grid-rows-3 gap-4 items-start">
            <div>
              <p className="text-gray-500">VALOR REQUERIDO</p>
              <p className="font-bold">R$ 60.000,00</p>
            </div>
            <div>
              <p className="text-gray-500">TAXA DE JUROS</p>
              <p className="font-bold">1% ao mês</p>
            </div>
            <div>
              <p className="text-gray-500">VALOR QUE DESEJA PAGAR POR MÊS</p>
              <p className="font-bold">R$ 15.000,00</p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL DE MESES PARA QUITAR</p>
              <p className="font-bold">5 MESES</p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL DE JUROS</p>
              <p className="font-bold">R$ 1.545,53</p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL A PAGAR</p>
              <p className="font-bold">R$ 61.545,53</p>
            </div>
          </article>
          <article className="flex flex-col gap-6">
            <h3 className="font-bold text-sm text-gray-500">
              PROJEÇÃO DAS PARCELAS:
            </h3>
            <Table headers={tableHeaders} data={data} /> //TODO:Ajustar tipagens
            <Button variant="secondary">
              <span>EFETIVAR O EMPRÉSTIMO</span>
              <img
                src={ArrowIcon}
                alt="Ícone de uma seta na cor branca apontando para a direita"
              />
            </Button>
          </article>
        </section>
      </main>
    </>
  );
};

export { Simulation };
