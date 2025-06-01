import Image from 'next/image';
import Link from 'next/link';

export function Register() {
  return (
    <section className="flex flex-col sm:flex-row mt-15 mb-20 justify-center gap-20 mx-5">
      <div className="flex flex-col gap-8 text-center">
        <h1 className="text-azure-primary text-3xl font-bold">
          FAÇA SEU REGISTRO <span className="text-slate-gray">AGORA</span> !
        </h1>
        <p className="text-slate-gray sm:text-lg font-semibold ">
          Não perca a chance de fazer a diferença na sua <br className="hidden sm:block" />
          escola! Com o D.A.F.E, sua voz será ouvida de forma <br className="hidden sm:block" />
          contínua e direta. Cadastre-se agora e comece a <br className="hidden sm:block" />
          compartilhar suas opiniões, ficar por dentro dos <br className="hidden sm:block" />
          comunicados e ajudar a criar um ambiente escolar <br />
          mais transparente e participativo.
        </p>
        <Link href="/register">
          <button className="cursor-pointer bg-azure-primary btn-dafe-hover text-3xl font-bold text-white px-12 sm:px-20 py-4 rounded-tl-xl rounded-br-xl">
            Cadastrar-se
          </button>
        </Link>
      </div>
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
    </section>
  );
}
