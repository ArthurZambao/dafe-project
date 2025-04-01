import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#007BFF] p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Logo no canto esquerdo */}
        <h1 className="text-5xl font-semibold mb-4 sm:mb-0">LOGO</h1>

        {/* Navegação no centro */}
        <nav className="hidden flex-grow sm:flex justify-center">
          <ul className="flex items-center space-x-10 text-xl">
            <li className="hover:font-semibold">
              <Link href="#">Início</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="#">Fórum</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="#">Notícias</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="#">Denúncias</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="#">Conversas</Link>
            </li>
            <li className="hover:font-semibold">
              <Link href="#">Entrar</Link>
            </li>
          </ul>
        </nav>

        {/* Imagens à direita */}
        <div className="flex space-x-4">
          <Image src="/ig-logo.svg" width={50} height={50} alt="Ig Logo" />
          <Image src="/x-logo.svg" width={50} height={50} alt="X Logo" />
          <Image src="/fb-logo.svg" width={50} height={50} alt="Fb Logo" />
        </div>
      </div>

      {/* Copyright abaixo */}
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-bold">© 2025 D.A.F.E. Todos os direitos reservados.</h2>
      </div>
    </footer>
  );
}
