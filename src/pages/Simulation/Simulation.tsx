import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { Header, Table } from "../../components/table";
import ArrowIcon from "../../assets/arrow.svg";
import { useFetch } from "../../hooks/use-fetch";
import { formatCurrencyToBRL } from "../../utils/currency-formatter.utils";
import { Loan } from "../../types/loan.types";
import { useEffect, useState } from "react";
import { formatDateToDDMMYY } from "../../utils/date-formatter.utils";
import { BillsFormatted } from "../../types/bills.types";

interface LoanSimulator {
  outstanding_balance: string;
  fees: string;
  outstanding_balance_adjusted: string;
  installment_value: string;
  due_date: string;
}

const tableHeaders: Header<BillsFormatted>[] = [
  { label: "Saldo Devedor", key: "outstandingBalance" },
  { label: "Juros", key: "interest" },
  { label: "Saldo Devedor Ajustado", key: "outstandingBalanceAdjusted" },
  { label: "Valor da Parcela", key: "installmentAmount" },
  { label: "Vencimento", key: "due" },
];

const Simulation = () => {
  const { simulationId } = useParams<{ simulationId: string }>();
  const [bills, setBills] = useState<BillsFormatted[]>([]);

  const [{ data: loans }] = useFetch<LoanSimulator, Loan>(
    `/loans/simulation/${simulationId}`,
    {
      method: "GET",
    }
  );

  useEffect(() => {
    if (loans) {
      const billsFormatted = loans.bills.map((bill) => ({
        outstandingBalance: formatCurrencyToBRL(bill.outstandingBalance),
        interest: formatCurrencyToBRL(bill.interest),
        outstandingBalanceAdjusted: formatCurrencyToBRL(
          bill.outstandingBalanceAdjusted
        ),
        installmentAmount: formatCurrencyToBRL(bill.installmentAmount),
        due: formatDateToDDMMYY(new Date(bill.due)),
      }));

      setBills(billsFormatted);
    }
  }, [loans]);

  return (
    <>
      <main>
        <header className="flex flex-col items-center gap-8">
          <h1 className="font-bold ">
            Veja a simulação para o seu empréstimo antes de efetivar
          </h1>
        </header>
        <section className="bg-white rounded-md shadow-[0px_0px_10px_0px_#ECECEC] p-8 mt-6">
          <article className="grid grid-cols-3 grid-rows-3 gap-4 items-start">
            <div>
              <p className="text-gray-500">VALOR REQUERIDO</p>
              <p className="font-bold">
                {formatCurrencyToBRL(loans?.requestedValue ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">TAXA DE JUROS</p>
              <p className="font-bold">
                {loans && loans.interestRate * 100}% ao mês
              </p>
            </div>
            <div>
              <p className="text-gray-500">VALOR QUE DESEJA PAGAR POR MÊS</p>
              <p className="font-bold">
                {formatCurrencyToBRL(loans?.installments ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL DE MESES PARA QUITAR</p>
              <p className="font-bold">{loans?.installmentsAmount} MESES</p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL DE JUROS</p>
              <p className="font-bold">
                {formatCurrencyToBRL(loans?.totalInterest ?? 0)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">TOTAL A PAGAR</p>
              <p className="font-bold">
                {formatCurrencyToBRL(loans?.totalAmount ?? 0)}
              </p>
            </div>
          </article>
          <article className="flex flex-col gap-6">
            <h3 className="font-bold text-sm text-gray-500">
              PROJEÇÃO DAS PARCELAS:
            </h3>
            <Table headers={tableHeaders} data={bills ?? []} />
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
