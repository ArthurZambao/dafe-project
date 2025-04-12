'use client';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTopic: string | null;
  setSelectedTopic: (value: string | null) => void;
}

const filterOptions = ['diretores', 'alunos', 'aulas', 'atividades', 'extracurriculares'];

export function FilterModal({ isOpen, onClose, selectedTopic, setSelectedTopic }: FilterModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-white z-50 flex flex-col items-center p-6 shadow-lg h-[70vh] max-h-[70vh] overflow-auto rounded-t-3xl">
        <h1 className="text-[#2D2D2D] text-2xl sm:text-3xl font-bold mt-2 mb-6 text-center">
          Filtrar Por
        </h1>
        <div className="space-y-4 w-full max-w-md mx-auto">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedTopic(option);
                onClose();
              }}
              className={`px-6 py-4 rounded-tl-[2rem] rounded-br-[2rem] w-full font-semibold text-lg cursor-pointer
                ${selectedTopic === option ? 'bg-[#007BFF] text-white' : 'border border-[#007BFF] text-[#007BFF]'}`}
            >
              {option}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedTopic(null);
              onClose();
            }}
            className="mt-6 font-bold border border-[#007BFF] text-[#007BFF] cursor-pointer rounded-tl-[20px] rounded-br-[20px] w-full py-3"
          >
            Mostrar Todos
          </button>
        </div>
      </div>
    </>
  );
}
