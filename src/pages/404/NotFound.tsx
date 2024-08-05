import { Link } from "react-router-dom";

type NotFoundProps = {
  message?: string;
};

const NotFound = ({ message }: NotFoundProps) => {
  return (
    <>
      <main>
        <header className="flex flex-col items-center gap-8">
          <h1 className="text-[3.125rem] text-text-primary font-light	">
            Ooopss...
          </h1>
        </header>
        <section className="bg-white rounded-md shadow-[0px_0px_10px_0px_#ECECEC] p-8 mt-6 flex">
          <article className="flex flex-col items-center gap-4 p-10">
            <div className="text-center">
              <p className="text-gray-500">404</p>
              <p className="font-bold">{message ?? "Página não encontrada"}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Voltar para a página inicial</p>
              <Link to="/" className="font-bold">
                Clique aqui
              </Link>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export { NotFound };
