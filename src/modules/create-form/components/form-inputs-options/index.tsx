import { UseFormRegister } from 'react-hook-form';
import { CreateFormDataSchema } from '../../schemas/create-form-schema';

interface OptionInputProps {
  register: UseFormRegister<CreateFormDataSchema>;
  index: number;
  qIndex: number;
  type: 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA';
  isPreview?: boolean; 
}

export const OptionInput = ({ register, index, qIndex, type, isPreview }: OptionInputProps) => (
  <label className={`flex gap-2 items-center ${isPreview ? 'opacity-70 cursor-not-allowed' : ''}`}>
    {type === 'MÚLTIPLA_ESCOLHA' ? (
      <input
        type="checkbox"
        disabled={isPreview}
      />
    ) : (
      <input
        type="radio"
        disabled={isPreview} 
      />
    )}

    <input
      {...register(`perguntas.${qIndex}.opcoes.${index}.label` as const)}
      placeholder={`Opção ${index + 1}`}
      className="border-b p-1"
      disabled={isPreview} 
    />
  </label>
);
