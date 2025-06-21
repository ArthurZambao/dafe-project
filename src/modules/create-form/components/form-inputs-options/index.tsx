import { UseFormRegister } from "react-hook-form";
import { CreateFormDataSchema } from "../../schemas/create-form-schema";

interface OptionInputProps {
  register: UseFormRegister<CreateFormDataSchema>;
  index: number;
  qIndex: number;
  type: 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA';
}

export const OptionInput = ({ register, index, qIndex, type }: OptionInputProps) => (
  <label className="flex gap-2 items-center">
    {type === 'MÚLTIPLA_ESCOLHA' ? (
      <input
        type="checkbox"
        {...register(`perguntas.${qIndex}.opcoes.${index}.checked` as const)}
      />
    ) : (
      <input
        type="radio"
        {...register(`perguntas.${qIndex}.opcoes.${index}.checked` as const)}
        value="true"
        checked={undefined}
      />
    )}
    <input
      {...register(`perguntas.${qIndex}.opcoes.${index}.label` as const)}
      placeholder={`Opção ${index + 1}`}
      className="border-b p-1"
    />
  </label>
);
