'use client';
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  onToggle: () => void;
}

export function FilterBar({ onToggle }: FilterBarProps) {
  return (
    <div className="flex justify-between items-center py-10 px-6 sm:px-16 relative">
      <h2 className="text-[#007BFF] text-3xl sm:text-4xl font-semibold">Principais Assuntos</h2>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 cursor-pointer bg-[#007BFF] text-xl sm:text-lg font-bold text-white px-10 py-2 rounded-tl-xl rounded-br-xl"
      >
        <SlidersHorizontal size={16} /> Filtrar Por
      </button>
    </div>
  );
}
