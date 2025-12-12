import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-azure-footer text-white px-12 py-3 select-none">
      <div className="w-full flex justify-between items-center relative py-6 sm:py-0">
        <Link href="/" className="flex items-center h-full">
          <h1 className="text-2xl sm:text-4xl font-semibold">D.A.F.E</h1>
        </Link>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/projeto.dafe">
            <Image src="/icons/ig-logo.svg" width={50} height={50} alt="Ig Logo" />
          </a>
          <a href="https://www.twitter.com/projeto_dafe">
            <Image src="/icons/x-logo.svg" width={50} height={50} alt="X Logo" />
          </a>
          <a href="https://www.instagram.com/projeto.dafe">
            <Image src="/icons/fb-logo.svg" width={50} height={50} alt="Fb Logo" />
          </a>
        </div>
      </div>
      <div>
        <h2 className="text-lg sm:text-2xl font-bold text-center">
          © 2025 D.A.F.E. Todos os direitos reservados.
        </h2>
      </div>
    </footer>
  );
}
