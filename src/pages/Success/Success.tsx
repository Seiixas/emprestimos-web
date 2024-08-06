import { useParams } from "react-router-dom";
import SuccessImage from "../../assets/success.svg";

const Success = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <main>
        <header className="flex flex-col items-center gap-8">
          <h1 className="text-[3.125rem] text-text-primary font-light	">
            Parabéns!!
          </h1>
        </header>
        <section className="bg-white rounded-md shadow-[0px_0px_10px_0px_#ECECEC] p-8 mt-6 flex flex-col gap-4">
          <img
            src={SuccessImage}
            alt="Imagem vetorizada na cor verde com uma marca de checagem interna na cor branca simbolizando o sucesso na operação"
            className="w-40 h-40 mx-auto"
          />
          <p className="text-center">
            Você acaba de efetivar o empréstimo com o ID: <br />
            <strong>{id}</strong>
          </p>
        </section>
      </main>
    </>
  );
};

export { Success };
