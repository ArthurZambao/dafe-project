'use client';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="px-6 sm:px-16 py-6">
      <input
        type="text"
        placeholder="Pesquisar notícias"
        value={searchTerm}
        onChange={handleChange}
        className="w-full border border-azure-primary text-gray-700 placeholder-gray-400 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-azure-primary transition"
      />
    </div>
  );
}
