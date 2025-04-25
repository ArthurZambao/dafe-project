import Image from 'next/image';
import Link from 'next/link';

export function Register() {
  return (
    <section className="flex justify-center gap-8 py-10 px-4 flex-col sm:flex-row text-[#6C757D]">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-8 sm:gap-[20rem]">
        <h1 className="font-bold text-xl sm:text-4xl pb-4 sm:pb-10">
          <span className='text-[#007BFF]'>FAÇA SEU REGISTRO</span> AGORA!
        </h1>
        <p className="text-sm sm:text-xl pb-6 sm:pb-0">
        Não perca a chance de fazer a diferença na sua escola! Com o D.A.F.E, sua voz será ouvida de forma contínua e direta. Cadastre-se agora e comece a compartilhar suas opiniões, ficar por dentro dos comunicados e ajudar a criar um ambiente escolar mais transparente e participativo.
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
