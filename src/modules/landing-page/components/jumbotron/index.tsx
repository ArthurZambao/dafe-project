import { SlideIn } from '@/global/animations/slideIn';
import Image from 'next/image';
import Link from 'next/link';

export function Jumbotron() {
  return (
    <div className="gradient-bg overflow-hidden text-black flex flex-col sm:flex-row items-center sm:items-start justify-between relative">

      {/* Texto */}
      <div className="w-full sm:w-1/2 text-center sm:text-left py-20 px-6 z-10">
        <SlideIn delay={2} from="left">
          <h2 className="font-bold text-2xl sm:text-4xl pb-6">
            Cadastro Simples e Rápido
          </h2>

          <div className="max-w-full sm:pr-40">
            <p className="text-base sm:text-xl font-light leading-relaxed mb-8">
              O cadastro é rápido e fácil. Os alunos criam sua conta com
              informações básicas, como nome, turma e email, e em poucos
              minutos estão prontos para começar a usar o aplicativo.
            </p>
          </div>

          <ul className="text-left text-base sm:text-xl font-medium text-gray-700 space-y-6 mb-12 px-4 sm:px-0">
            <li className="flex items-center">
              <span className="w-6 h-6 bg-[#4A83C0] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                1
              </span>
              Preencha suas informações básicas
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 bg-[#4A83C0] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                2
              </span>
              Confirme seu email
            </li>
            <li className="flex items-center">
              <span className="w-6 h-6 bg-[#4A83C0] text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                3
              </span>
              Comece a usar o D.A.F.E
            </li>
          </ul>
        </SlideIn>

        {/* Botões */}
        <SlideIn delay={1.9} from="bottom">
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start text-md sm:text-xl">
            <Link href="/register">
              <button className="px-10 py-2 btn-register-jumbotron w-full sm:w-auto">
                Criar conta
              </button>
            </Link>
            <Link href="/login">
              <button className="px-10 py-2 btn-login-jumbotron w-full sm:w-auto">
                Entrar
              </button>
            </Link>
          </div>
        </SlideIn>
      </div>

      {/* Imagem principal + decorativas */}
      <div className="w-full flex justify-center sm:justify-end z-10 relative pb-10 sm:pb-0">
        <SlideIn delay={1.5}>
          <Image
            src="/svgs/lpage-jumbotron-image.svg"
            alt="imagem de registro"
            width={900}
            height={680}
            className="sm:block hidden object-contain w-[100%] max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]"
            priority
          />
        </SlideIn>

        {/* Cartoon superior */}
        <div className="absolute top-10 right-60 hidden md:block">
          <SlideIn delay={2}>
            <Image
              src="/svgs/lpage-jumbotron-cartoon-1.svg"
              alt="Pessoas na nuvem"
              width={260}
              height={260}
              className="rounded-xl shadow-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            />
          </SlideIn>
        </div>

        {/* Cartoon inferior */}
        <div className="absolute bottom-10 left-80 hidden md:block">
          <SlideIn delay={1.8}>
            <Image
              src="/svgs/lpage-jumbotron-cartoon-2.svg"
              alt="Pessoas conversando com barbante"
              width={260}
              height={260}
              className="rounded-xl shadow-sm transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            />
          </SlideIn>
        </div>
      </div>
    </div>
  );
}
