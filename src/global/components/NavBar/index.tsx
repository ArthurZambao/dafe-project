'use client';

import Link from 'next/link';
import { useState } from 'react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-[#007BFF] flex justify-between p-10 mx-auto items-center relative">
      <h1 className="text-5xl font-semibold">LOGO</h1>

      <button className="block sm:hidden ml-auto text-3xl" type="button" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </button>

      <nav>
        <ul className="hidden sm:flex items-center space-x-10 text-xl">
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

      {isOpen && (
        <nav className="absolute top-30 left-1/2 transform -translate-x-1/2 w-full bg-[#007BFF] shadow-l">
          <ul className="flex flex-col items-center space-y-4 py-4 text-xl">
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
      )}
    </div>
  );
}
