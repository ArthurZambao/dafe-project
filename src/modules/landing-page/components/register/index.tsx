import Image from 'next/image';

export function Register() {
  return (
    <section className="flex flex-col sm:flex-row mt-15 mb-20 justify-center gap-20 mx-5">
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-[#007BFF] text-3xl font-bold">
          FAÇA SEU REGISTRO <span className="text-[#6C757D]">AGORA</span> !
        </h1>
        <p className="text-[#6C757D] sm:text-lg font-semibold ">
          Não perca a chance de fazer a diferença na sua <br className="hidden sm:block" />
          escola! Com o D.A.F.E, sua voz será ouvida de forma <br className="hidden sm:block" />
          contínua e direta. Cadastre-se agora e comece a <br className="hidden sm:block" />
          compartilhar suas opiniões, ficar por dentro dos <br className="hidden sm:block" />
          comunicados e ajudar a criar um ambiente escolar <br />
          mais transparente e participativo.
        </p>
        <div className="w-full sm:w-1/2">
          <Image
            src="/images/register-image.png"
            alt="Logo D.A.F.E"
            className="w-full h-auto rounded-2xl"
            layout="responsive"
            width={660}
            height={360}
          />
        </div>
      </div>
    </section>
  );
}
