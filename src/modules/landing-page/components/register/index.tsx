import { FadeInUp } from '@/global/animations/fadeInUp';
import Image from 'next/image';
import Link from 'next/link';

export function Register() {
  return (
    <FadeInUp delay={0.7}>
      <section className="flex flex-col sm:flex-row mt-10 sm:mt-15 mb-15 sm:mb-20 justify-center gap-20 p-8 sm:p-0 mx-0 sm:mx-[25rem]">
        <div className="flex flex-col gap-8 sm:w-1/2">
          <h1 className="text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-2xl sm:text-3xl font-bold">
            FAÇA SEU REGISTRO <span className="text-slate-gray">AGORA</span>!
          </h1>
          <p className="text-slate-gray leading-relaxed text-base sm:text-lg font-semibold">
            Não perca a chance de fazer a diferença na sua 
            escola! Com o D.A.F.E, sua voz será ouvida de forma 
            contínua e direta. Cadastre-se agora e comece a 
            compartilhar suas opiniões, ficar por dentro dos 
            comunicados e ajudar a criar um ambiente escolar 
            mais transparente e participativo.
          </p>
          <Link href="/register">
            <div className="flex justify-center sm:justify-start">
              <button className="cursor-pointer btn-dafe btn-dafe-hover duration-300 text-xl sm:text-2xl font-bold text-white px-8 sm:px-20 py-2 sm:py-4">
                Cadastrar-se
              </button>
            </div>
          </Link>
        </div>

        <div className="sm:w-1/2 flex justify-center items-center rounded-xl overflow-hidden">
          <Image
            src="/images/register-image.png"
            alt="imagem de registro"
            width={900}
            height={680}
            className="object-contain max-w-[800px] w-full h-auto"
            priority
          />
        </div>
      </section>
    </FadeInUp>
  );
}
