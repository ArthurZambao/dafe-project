import { AnimatedContent } from "@/global/animations/animatedContent";
import { CreateFormInput, CreateFormTextarea } from "../form-inputs-components";
import { OptionInput } from "../form-inputs-options";
import { RequiredToggle } from "@/global/components/RequiredToggle";
import { Trash2 } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { CreateFormDataSchema } from "../../schemas/create-form-schema";

interface FieldArrayProps {
  fields: { id: string; tipo?: string }[];
  register: UseFormRegister<CreateFormDataSchema>;
  remove: (index: number) => void;
  perguntas: CreateFormDataSchema['perguntas'];
}

export function FieldArray({fields, register, remove, perguntas}: FieldArrayProps){
  return(
    <>
      {fields.map((field, qIndex) => (
        <AnimatedContent inverse key={field.id}>
          <div className="py-4 border-b-2 border-azure-primary">
            <div className="flex flex-col-reverse sm:flex-row pb-4 gap-2 items-center">
              <CreateFormInput
                isFormHeader={false}
                register={register}
                name={`perguntas.${qIndex}.titulo`}
                placeholder="Título da pergunta"
              />
              <select
                {...register(`perguntas.${qIndex}.tipo` as const)}
                className="border rounded-3xl p-2"
                defaultValue={field.tipo || 'MÚLTIPLA_ESCOLHA'}
              >
                <option value="MÚLTIPLA_ESCOLHA">Múltipla Escolha</option>
                <option value="ESCOLHA_ÚNICA">Escolha Única</option>
                <option value="DISSERTATIVA">Dissertativa</option>
              </select>
            </div>

            <CreateFormTextarea
              rows={1}
              register={register}
              name={`perguntas.${qIndex}.enunciado`}
              placeholder="Enunciado da pergunta"
            />

            {['MÚLTIPLA_ESCOLHA', 'ESCOLHA_ÚNICA'].includes(
              perguntas?.[qIndex]?.tipo ?? ''
            ) &&
              Array.from({ length: 5 }).map((_, i) => (
                <OptionInput
                  key={i}
                  register={register}
                  index={i}
                  qIndex={qIndex}
                  type={perguntas?.[qIndex]?.tipo as 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA'}
                />
              ))}

            {perguntas?.[qIndex]?.tipo === 'DISSERTATIVA' && (
              <CreateFormTextarea
                rows={1}
                register={register}
                name={`perguntas.${qIndex}.resposta`}
                placeholder="Resposta dissertativa do aluno"
              />
            )}
            <div className="flex gap-2 justify-end pt-2">
              <RequiredToggle register={register} name={`perguntas.${qIndex}.obrigatoria`} />
              <button
                type="button"
                onClick={() => remove(qIndex)}
                className="cursor-pointer text-azure-primary border-l-2 border-azure-primary pl-2 hover:text-red-500 transition-colors duration-300"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        </AnimatedContent>
      ))}
    </>
  )
}