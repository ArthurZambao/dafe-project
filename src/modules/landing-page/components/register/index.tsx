import Link from 'next/link';

export function Register() {
  return (
      <section className="bg-[url('/svgs/lpage-register-bg.svg')] flex flex-col sm:flex-row mt-10 sm:mt-15 mb-15 sm:mb-20 justify-center gap-20 px-6 sm:px-10 lg:px-0 max-w-6xl mx-auto">
        <div className="flex flex-col gap-8 sm:w-1/2">
          <h2 className="text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-2xl sm:text-3xl font-bold">
            FAÇA SEU REGISTRO <span className="text-slate-gray">AGORA</span>!
          </h2>
          <p className="text-slate-gray leading-relaxed text-base sm:text-lg font-semibold">
            Não perca a chance de fazer a diferença na sua escola! Com o D.A.F.E, sua voz será
            ouvida de forma contínua e direta. Cadastre-se agora e comece a compartilhar suas
            opiniões, ficar por dentro dos comunicados e ajudar a criar um ambiente escolar mais
            transparente e participativo.
          </p>
          <Link href="/register">
            <div className="flex justify-center sm:justify-start">
              <button className="cursor-pointer btn-dafe btn-dafe-hover duration-300 text-xl sm:text-2xl font-bold text-white px-8 sm:px-20 py-2 sm:py-4">
                Cadastrar-se
              </button>
            </div>
          </Link>
        </div>
      </section>
  );
}