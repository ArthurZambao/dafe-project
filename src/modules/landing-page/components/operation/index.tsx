import Image from 'next/image';

export function Operation() {
  return (
    <section className="text-white py-10 bg-azure-primary w-full rounded-tr-[8rem] sm:rounded-bl-[8rem]">
      <h2 className="text-3xl font-bold text-center mt-20 mb-12 px-2 sm:px-0">
        Como Funciona <br className='block sm:hidden' />a D.A.F.E
      </h2>

      <div className="flex justify-center gap-8 py-10 px-4 flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-[20rem]">
          <div className="w-full sm:w-1/2">
            <Image
              src="/images/operation-image-1.png"
              alt="Logo D.A.F.E"
              className="w-full h-auto rounded-2xl"
              layout="responsive"
              width={660}
              height={360}
            />
          </div>
          <div className="pt-4 text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-4 sm:pb-10">Cadastro Simples:</h1>
            <p className="text-sm sm:text-xl pb-6 sm:pb-0">
              <span className="font-bold">O cadastro é rápido e fácil.</span> Os alunos criam sua{' '}
              <br />
              conta com informações básicas, como nome, turma e email, e{' '}
              <br className="sm:block hidden" />
              em poucos minutos estão prontos para começar a usar o aplicativo.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 py-10 px-4 flex-col sm:flex-row">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8 sm:gap-[20rem]">
          <div className="pt-4 text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-4 sm:pb-10">FeedBack Constante:</h1>
            <p className="text-sm sm:text-xl pb-6 sm:pb-0 px-2 sm:px-0">
              Sua opinião nos guia: com <span className="font-bold">feedback constante</span>,
              ajustamos
              <br className="hidden sm:block" />
              cada detalhe para oferecer uma plataforma cada 
              <br className="hidden sm:block" />
              vez mais eficiente, transparente e feita para você.
            </p>
          </div>
          <div className="w-full sm:w-1/2">
            <Image
              src="/images/operation-image-2.png"
              alt="Logo D.A.F.E"
              className="w-full h-auto rounded-2xl"
              layout="responsive"
              width={660}
              height={360}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-8 py-10 px-4 flex-col sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-[20rem]">
          <div className="w-full sm:w-1/2">
            <Image
              src="/images/operation-image-3.png"
              alt="Logo D.A.F.E"
              className="w-full h-auto rounded-2xl"
              layout="responsive"
              width={660}
              height={360}
            />
          </div>
          <div className="pt-4 text-center">
            <h1 className="font-bold text-xl sm:text-4xl pb-4 sm:pb-10">Receba Comunicados:</h1>
            <p className="text-sm sm:text-xl pb-6 sm:pb-0">
              <span className="font-bold">Comunicados importantes da escola</span>, como eventos e
              <br className="sm:block hidden" />
              atualizações, serão enviados diretamente para seu <br className="sm:block hidden" />
              celular ou computador, mantendo você sempre informado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
