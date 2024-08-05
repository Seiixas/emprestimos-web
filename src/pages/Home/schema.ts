import { z } from "zod";

export const requestLoanSimulationSchema = z.object({
  cpf: z
    .string({ required_error: "O seu nome é obrigatório." })
    .min(1, "O seu nome é obrigatório."),
  uf: z.enum(["MG", "SP", "ES", "RJ"], {
    required_error: "O estado é obrigatório.",
    invalid_type_error: "O estado é inválido.",
  }),
  birthday: z.string({ required_error: "A data de nascimento é obrigatória." }),
  loan: z
    .string({ required_error: "O valor do empréstimo é obrigatório." })
    .min(0)
    .max(50000, {
      message: "O valor do empréstimo deve ser menor que R$ 50.000,00",
    }),
  installment: z
    .string({
      required_error: "O valor da parcela é obrigatório.",
    })
    .min(0), // TODO: Validar porcentagem do valor total
});

export type requestLoanSimulationType = z.infer<
  typeof requestLoanSimulationSchema
>;
