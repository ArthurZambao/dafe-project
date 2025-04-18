import Image from 'next/image';

export function Footer() {
  return (
    <footer className="w-full text-white bg-[#007BFF] p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        {/* Logo no canto esquerdo */}
        <h1 className="text-3xl sm:text-5xl font-semibold mb-4 sm:mb-0">LOGO</h1>

        {/* Imagens à direita */}
        <div className="flex space-x-4">
          <Image src="/icons/ig-logo.svg" width={50} height={50} alt="Ig Logo" />
          <Image src="/icons/x-logo.svg" width={50} height={50} alt="X Logo" />
          <Image src="/icons/fb-logo.svg" width={50} height={50} alt="Fb Logo" />
        </div>
      </div>

      {/* Copyright abaixo */}
      <div className="mt-4 text-center">
        <h2 className="text-lg sm:text-2xl font-bold">© 2025 D.A.F.E. Todos os direitos reservados.</h2>
      </div>
    </footer>
  );
}
