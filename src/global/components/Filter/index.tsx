import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { PostButton } from '@/modules/forum-page/components/post-button';

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
      <div className="flex sm:justify-between items-start py-10 px-6 sm:px-16 relative">
        <h2 className="hidden sm:block text-azure-secondary text-5xl font-semibold">
          Principais Assuntos
        </h2>
        <div className='flex items-center gap-10'>
          <PostButton />
          <button
            onClick={handleToggle}
            className="flex items-center gap-2 cursor-pointer text-xl sm:text-lg text-black py-2"
          >
            <span className="hidden sm:block">Filtrar Por</span><SlidersHorizontal size={16} />
          </button>
        </div>
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
                  className={`px-6 py-4 rounded-xl w-full font-semibold text-lg cursor-pointer btn-dafe-hover hover:text-white duration-300
                    ${selectedFilter === option ? 'btn-dafe text-white' : 'border border-azure-primatext-azure-primary text-azure-primary'}`}
                >
                  {option}
                </button>
              ))}
              <button
                onClick={() => {
                  setSelectedFilter(null);
                  handleClose();
                }}
                className="mt-6 font-bold border border-azure-primatext-azure-primary text-azure-primary cursor-pointer rounded-xl w-full btn-dafe-hover hover:text-white py-3 duration-300"
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
