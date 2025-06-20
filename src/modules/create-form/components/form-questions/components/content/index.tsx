import { useState } from 'react';
import { selectFormQuestsOptions } from '../../../../constants/select-form-quests-options';
import { MultipleChoiceQuestions } from '../multiple-choise-questions';
import { RequiredToggle } from '../../../../../../global/components/RequiredToggle';
import { Trash2 } from 'lucide-react';
import { UniqueChoiceQuestions } from '../unique-choice-questions';

interface FormQuestionsProps {
  onDelete: () => void;
}

export function FormQuestions({ onDelete }: FormQuestionsProps) {
  const [questionsOption, setQuestionsOption] = useState('Múltipla Escolha');

  const handleSelect = (option: string) => {
    setQuestionsOption(option);
  };

  return (
    <section className="flex-col items-center gap-4 border-b-2">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Título da Pergunta"
          className="text-2xl p-2 border-b focus:outline-none focus:ring-0 rounded-t-xl bg-[#B7DAFF] flex-1"
        />

        <select
          value={questionsOption}
          onChange={(e) => handleSelect(e.target.value)}
          className="focus:outline-none focus:ring-0 cursor-pointer border rounded-4xl px-4 py-2"
        >
          {selectFormQuestsOptions.map((option) => (
            <option key={option} value={option} className="cursor-pointer">
              {option}
            </option>
          ))}
        </select>
      </div>

      {questionsOption === 'Múltipla Escolha' && <MultipleChoiceQuestions />}
      {questionsOption === 'Escolha Única' && <UniqueChoiceQuestions />}

      <div className="flex gap-2 pb-2 justify-end">
        <RequiredToggle />
        <section className="border-l-2 border-azure-primary px-2">
          <Trash2
            onClick={onDelete}
            className="cursor-pointer text-azure-primary hover:text-red-500 transition-colors duration-300"
          />
        </section>
      </div>
    </section>
  );
}
