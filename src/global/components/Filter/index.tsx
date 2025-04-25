'use client';
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterProps {
  selectedFilter: string | null;
  setSelectedFilter: (value: string | null) => void;
  filterOptions: string[];
}

export function Filter({ selectedFilter, setSelectedFilter, filterOptions }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Botão da barra de filtro */}
      <div className="flex justify-between items-center py-10 px-6 sm:px-16 relative">
        <h2 className="text-[#007BFF] text-3xl sm:text-4xl font-semibold">Principais Assuntos</h2>
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 cursor-pointer bg-[#007BFF] text-xl sm:text-lg font-bold text-white px-10 py-2 rounded-tl-xl rounded-br-xl"
        >
          <SlidersHorizontal size={16} /> <span className='hidden sm:block'>Filtrar Por</span>
        </button>
      </div>

      {/* Modal de opções */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 flex flex-col items-center p-6 shadow-lg h-[70vh] max-h-[70vh] overflow-auto rounded-t-3xl">
            <h1 className="text-[#2D2D2D] text-2xl sm:text-3xl font-bold mt-2 mb-6 text-center">
              Filtrar Por
            </h1>
            <div className="space-y-4 w-full max-w-md mx-auto">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                    handleClose();
                  }}
                  className={`px-6 py-4 rounded-tl-[2rem] rounded-br-[2rem] w-full font-semibold text-lg cursor-pointer
                    ${selectedFilter === option ? 'bg-[#007BFF] text-white' : 'border border-[#007BFF] text-[#007BFF]'}`}
                >
                  {option}
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedFilter(null);
                  handleClose();
                }}
                className="mt-6 font-bold border border-[#007BFF] text-[#007BFF] cursor-pointer rounded-tl-[20px] rounded-br-[20px] w-full py-3"
              >
                Mostrar Todos
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
