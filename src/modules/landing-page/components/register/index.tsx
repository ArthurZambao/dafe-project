'use client';

import Link from 'next/link';


export function Register() {
  return (
    <section className="flex flex-col sm:flex-row mt-15 mb-20 justify-center gap-20 mx-5">
      <div className="flex flex-col gap-8 ">
        <h1 className="text-transparent bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-3xl font-bold">
          FAÇA SEU REGISTRO <span className="text-slate-gray">AGORA</span> !
        </h1>
        <p className="text-slate-gray text-justify sm:text-lg font-semibold ">
          Não perca a chance de fazer a diferença na sua <br className="hidden sm:block" />
          escola! Com o D.A.F.E, sua voz será ouvida de forma <br className="hidden sm:block" />
          contínua e direta. Cadastre-se agora e comece a <br className="hidden sm:block" />
          compartilhar suas opiniões, ficar por dentro dos <br className="hidden sm:block" />
          comunicados e ajudar a criar um ambiente escolar <br />
          mais transparente e participativo.
        </p>
        <Link href="/register">
          <button className="cursor-pointer btn-dafe btn-dafe-hover duration-300 text-3xl font-bold text-white px-12 sm:px-20 py-4">
            Cadastrar-se
          </button>
        </Link>
      </div>
      <div className="sm:w-1/2 bg-light-dafe-gray rounded-xl shadow-lg overflow-hidden">
        {/* Aqui Vai a Imagem do register */}
      </div>
    </section>
  );
}
