import Image from "next/image";

export function Operation() {
  return (
    <section className="text-white py-10 bg-[#007BFF] w-full rounded-tr-[8rem] sm:rounded-bl-[8rem]">
      <h2 className="text-3xl font-bold text-center mt-20 mb-12">
        Como Funciona a D.A.F.E
      </h2>

      <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
        <div className="flex items-center justify-between sm:gap-[20rem]">
          <Image
            src="/fb-logo.svg"
            width={250}
            height={250}
            alt="Logo D.A.F.E"
            className="max-w-full"
          />
          <div className="pt-4 sm:text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-10">Cadastro Simples:</h1>
            <p className="text-sm sm:text-xl">
              <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua{' '}
              <br />
              conta com informações básicas, como nome, turma e email, e <br />
              em poucos minutos estão prontos para começar a usar o aplicativo.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
        <div className="flex items-center justify-between sm:gap-[20rem]">
          <div className="pt-4 sm:text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-10">FeedBack Constante:</h1>
            <p className="text-sm sm:text-xl">
              <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua{' '}
              <br />
              conta com informações básicas, como nome, turma e email, e <br />
              em poucos minutos estão prontos para começar a usar o aplicativo.
            </p>
          </div>
          <Image
            src="/fb-logo.svg"
            width={250}
            height={250}
            alt="Logo D.A.F.E"
            className="max-w-full"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-col md:flex-row justify-center gap-8 py-10 px-4">
        <div className="flex items-center justify-between sm:gap-[20rem]">
          <Image
            src="/fb-logo.svg"
            width={250}
            height={250}
            alt="Logo D.A.F.E"
            className="max-w-full"
          />
          <div className="pt-4 sm:text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-10">Receba Comunicados:</h1>
            <p className="text-sm sm:text-xl">
              <span className="font-bold">Comunicados importantes da escola</span> , como eventos e{' '}
              <br />
              atualizações, serão enviados diretamente para seu <br />
              celular ou computador, mantendo você sempre informado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
