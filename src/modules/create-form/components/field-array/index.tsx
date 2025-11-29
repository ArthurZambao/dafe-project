import { AnimatedContent } from "@/global/animations/animatedContent";
import { CreateFormInput, CreateFormTextarea } from "../form-inputs-components";
import { OptionInput } from "../form-inputs-options";
import { RequiredToggle } from "@/global/components/RequiredToggle";
import { Trash2 } from "lucide-react";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { CreateFormDataSchema } from "../../schemas/create-form-schema";

interface FieldArrayProps {
  fields: { id: string; tipo?: string; opcoes?: { label?: string; checked?: boolean }[] }[];
  register: UseFormRegister<CreateFormDataSchema>;
  remove: (index: number) => void;
  perguntas: CreateFormDataSchema['perguntas'];
  errors: FieldErrors<CreateFormDataSchema>;
}

export function FieldArray({ fields, register, remove, perguntas, errors }: FieldArrayProps) {
  return (
    <>
      {fields.map((field, qIndex) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const qErrors = (errors as any)?.perguntas?.[qIndex] ?? {};

        const tituloError = qErrors?.titulo as FieldError | undefined;
        const enunciadoError = qErrors?.enunciado as FieldError | undefined;
        const respostaError = qErrors?.resposta as FieldError | undefined;
        const tipoError = qErrors?.tipo as FieldError | undefined;

        return (
          <AnimatedContent inverse key={field.id}>
            <div className="py-4 border-b-2 border-azure-primary">
              <div className="flex flex-col-reverse sm:flex-row pb-4 gap-2 items-center">
                <CreateFormInput
                  isFormHeader={false}
                  register={register}
                  name={`perguntas.${qIndex}.titulo`}
                  placeholder="Título da pergunta"
                  error={tituloError}
                />

                <div className="flex flex-col">
                  <select
                    {...register(`perguntas.${qIndex}.tipo` as const)}
                    className={`border rounded-3xl p-2 ${tipoError ? 'border-red-500' : ''}`}
                    defaultValue={field.tipo || 'MÚLTIPLA_ESCOLHA'}
                    aria-invalid={!!tipoError}
                    aria-describedby={tipoError ? `pergunta-${qIndex}-tipo-error` : undefined}
                  >
                    <option value="MÚLTIPLA_ESCOLHA">Múltipla Escolha</option>
                    <option value="ESCOLHA_ÚNICA">Escolha Única</option>
                    <option value="DISSERTATIVA">Dissertativa</option>
                  </select>

                  {tipoError && (
                    <span
                      id={`pergunta-${qIndex}-tipo-error`}
                      role="alert"
                      className="text-red-500 text-sm mt-1"
                    >
                      {tipoError.message}
                    </span>
                  )}
                </div>
              </div>

              <CreateFormTextarea
                rows={1}
                register={register}
                name={`perguntas.${qIndex}.enunciado`}
                placeholder="Enunciado da pergunta"
                error={enunciadoError}
              />

              {/* Opções: Múltipla escolha ou Escolha única */}
              {['MÚLTIPLA_ESCOLHA', 'ESCOLHA_ÚNICA'].includes(perguntas?.[qIndex]?.tipo ?? '') &&
                Array.from({ length: 5 }).map((_, i) => {

                  const optLabelError = (qErrors?.opcoes?.[i]?.label) as FieldError | undefined;

                  return (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <OptionInput
                          register={register}
                          index={i}
                          qIndex={qIndex}
                          type={perguntas?.[qIndex]?.tipo as 'MÚLTIPLA_ESCOLHA' | 'ESCOLHA_ÚNICA'}
                        />
                      </div>

                      {optLabelError && (
                        <span className="text-red-500 text-sm ml-7 mt-1">
                          {optLabelError.message}
                        </span>
                      )}
                    </div>
                  );
                })}

              {/* Resposta esperada (dissertativa) */}
              {perguntas?.[qIndex]?.tipo === 'DISSERTATIVA' && (
                <CreateFormTextarea
                  rows={1}
                  register={register}
                  name={`perguntas.${qIndex}.resposta`}
                  placeholder="Resposta dissertativa do aluno"
                  error={respostaError}
                />
              )}

              {/* Se for escolha única, exibe erro da resposta (se houver) */}
              {perguntas?.[qIndex]?.tipo === 'ESCOLHA_ÚNICA' && respostaError && (
                <span className="text-red-500 text-sm mt-1">
                  {respostaError.message}
                </span>
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
        );
      })}
    </>
  );
}
