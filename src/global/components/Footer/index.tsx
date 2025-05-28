import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex flex-col items-center bg-[#007BFF] text-white px-8 py-3 select-none">
      <div className="w-full flex justify-between relative">
        <Link href="/landing-page">
          <Image width={220} height={220} src="/icons/dafe-logo.svg" alt="Dafe Logo" />
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
