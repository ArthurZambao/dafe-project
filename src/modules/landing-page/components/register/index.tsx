import Image from 'next/image';
import Link from 'next/link';

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

        <Link href="/register" className="bg-[#007BFF] font-bold cursor-pointer text-white px-10 py-2 rounded-tl-2xl rounded-br-2xl mx-auto">
          Registrar-se
        </Link>
      </div>
      <Image
        src="/images/operation-image-register.png"
        width={660}
        height={360}
        alt="Logo D.A.F.E"
        className="max-w-full rounded-2xl"
      />
    </section>
  );
}
