'use client';

import { AnimatedContent } from '@/global/animations/animatedContent';
import { StoredForm } from '@/types/form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { getFormById } from '@/libs/services/forms/formService';
import {
  sendResponses,
  FormAnswer as FormAnswerType,
  SubmittedAnswer,
  hasUserAnswered,
} from '@/libs/services/forms/responseService';

interface FormAnswerProps {
  formId: string;
}

export function FormAnswer({ formId }: FormAnswerProps) {
  const [form, setForm] = useState<StoredForm | null>(null);
  const [respostas, setRespostas] = useState<(number | number[] | string | null)[]>([]);
  const router = useRouter();

  // ✅ impede execução duplicada no StrictMode (solução oficial)
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // evita executar 2 vezes
    effectRan.current = true;

    console.log('FormID recebido:', formId);

    async function verificar() {
      try {
        const answered = await hasUserAnswered(formId);

        if (answered) {
          toast.error('Você já respondeu esse formulário.');
          router.push('/forms-page');
          return;
        }

        const data = await getFormById(formId);
        setForm(data);

        const initial = data.perguntas.map((p: { tipo: string }) =>
          p.tipo === 'MÚLTIPLA_ESCOLHA' ? [] : ''
        );

        setRespostas(initial);
      } catch (err) {
        console.error(err);
      }
    }

    verificar();
  }, [formId, router]);

  const handleRadioChange = (qIndex: number, optionIndex: number) => {
    const newRespostas = [...respostas];
    newRespostas[qIndex] = optionIndex;
    setRespostas(newRespostas);
  };

  const handleCheckboxChange = (qIndex: number, optionIndex: number) => {
    const current = respostas[qIndex] as number[];
    const updated = current.includes(optionIndex)
      ? current.filter((i) => i !== optionIndex)
      : [...current, optionIndex];

    const newRespostas = [...respostas];
    newRespostas[qIndex] = updated;
    setRespostas(newRespostas);
  };

  const handleTextChange = (qIndex: number, text: string) => {
    const newRespostas = [...respostas];
    newRespostas[qIndex] = text;
    setRespostas(newRespostas);
  };

  const handleSubmit = async () => {
    try {
      if (!form) return;

      const payload: FormAnswerType[] = form.perguntas.map((pergunta, index) => {
        const raw = respostas[index];
        let submittedAnswer: SubmittedAnswer;

        if (pergunta.tipo === 'ESCOLHA_ÚNICA') {
          const idx = raw as number;
          const text = pergunta.opcoes?.[idx]?.label ?? '';
          submittedAnswer = text;
        } else if (pergunta.tipo === 'MÚLTIPLA_ESCOLHA') {
          const selected = raw as number[];
          const texts = selected
            .map((i) => pergunta.opcoes?.[i]?.label ?? '')
            .filter((t) => t.trim() !== '');
          submittedAnswer = texts;
        } else {
          submittedAnswer = (raw as string) ?? '';
        }

        return {
          questionId: pergunta._id,
          questionText: pergunta.enunciado,
          submittedAnswer,
        };
      });

      await sendResponses(form._id, payload);

      toast.success('Formulário respondido com sucesso!');
      router.push('/forms-page');
    } catch (err) {
      console.error('Erro ao enviar respostas:', err);
      toast.error('Não foi possível enviar as respostas.');
    }
  };

  if (!form)
    return <div className="p-10 text-center text-slate-gray">Carregando formulário...</div>;

  return (
    <div className="py-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <Link href="/forms-page" className="inline-flex">
        <h2 className="inline-flex gap-2 pl-6 sm:pl-20 pb-10 items-center text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
          <ArrowLeft /> Formulários
        </h2>
      </Link>

      <AnimatedContent inverse>
        <div className="bg-white rounded-3xl mx-6 sm:mx-20 py-10 px-8 sm:p-16 shadow-xl">
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-5xl break-words border-b-1 pb-2 text-azure-primary">
              {form.formTitulo}
            </h2>
            <p className="text-base text-slate-gray sm:text-lg break-words">{form.formDesc}</p>
          </section>

          <section className="py-10">
            <h2 className="text-xl sm:text-3xl font-semibold text-azure-secondary">Perguntas:</h2>

            {form.perguntas.map((pergunta, i) => (
              <div key={i} className="my-8 pb-4 border-b border-gray-100">
                <h2 className="text-base sm:text-xl rounded-lg bg-[#eff6ff] text-azure-primary font-medium p-4 mb-4">
                  {i + 1}. {pergunta.titulo}
                </h2>

                <p className="mb-4 text-base sm:text-lg font-medium pl-2">{pergunta.enunciado}</p>

                {pergunta.tipo === 'ESCOLHA_ÚNICA' && (
                  <div className="flex flex-col gap-3 pl-2">
                    {pergunta.opcoes?.map((opcao, idx) => (
                      <label
                        key={idx}
                        className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <input
                          type="radio"
                          name={`pergunta-${i}`}
                          className="w-5 h-5 text-azure-primary focus:ring-azure-primary cursor-pointer"
                          checked={respostas[i] === idx}
                          onChange={() => handleRadioChange(i, idx)}
                        />
                        <span className="text-lg">{opcao.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {pergunta.tipo === 'MÚLTIPLA_ESCOLHA' && (
                  <div className="flex flex-col gap-3 pl-2">
                    {pergunta.opcoes?.map((opcao, idx) => (
                      <label
                        key={idx}
                        className="flex gap-3 items-center cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-azure-primary focus:ring-azure-primary rounded cursor-pointer"
                          checked={(respostas[i] as number[]).includes(idx)}
                          onChange={() => handleCheckboxChange(i, idx)}
                        />
                        <span className="text-lg">{opcao.label}</span>
                      </label>
                    ))}
                  </div>
                )}

                {pergunta.tipo === 'DISSERTATIVA' && (
                  <textarea
                    value={(respostas[i] as string) || ''}
                    onChange={(e) => handleTextChange(i, e.target.value)}
                    className="w-full mt-2 border border-gray-300 rounded-xl p-4 focus:outline-none focus:border-azure-primary focus:ring-1 focus:ring-azure-primary transition-all"
                    placeholder="Digite sua resposta aqui..."
                    rows={4}
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center sm:justify-end pt-6">
              <button
                onClick={handleSubmit}
                className="btn-dafe btn-dafe-hover text-white px-8 py-3 text-lg sm:text-xl rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Enviar Respostas
              </button>
            </div>
          </section>
        </div>
      </AnimatedContent>
    </div>
  );
}
