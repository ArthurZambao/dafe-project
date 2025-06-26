'use client';

import { AnimatedContent } from '@/global/animations/animatedContent';
import { StoredForm } from '@/types/form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface FormProps {
  formId: string;
}

export function FormPageData({ formId }: FormProps) {
  const [form, setForm] = useState<StoredForm | null>(null);
  const [respostas, setRespostas] = useState<(number | number[])[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('finalData');
    if (!stored) return;

    try {
      const forms: StoredForm[] = JSON.parse(stored);
      const found = forms.find((f) => f.id === formId) ?? null;
      setForm(found);

      if (found) {
        const initial = found.perguntas.map((p) => (p.tipo === 'MÚLTIPLA_ESCOLHA' ? [] : 1));
        setRespostas(initial);
      }
    } catch (error) {
      console.error('Erro ao carregar formulário do localStorage', error);
      setForm(null);
    }
  }, [formId]);

  const handleRadioChange = (qIndex: number, optionIndex: number) => {
    const newRespostas = [...respostas];
    newRespostas[qIndex] = optionIndex;
    setRespostas(newRespostas);
    console.log(newRespostas);
  };

  const handleCheckboxChange = (qIndex: number, optionIndex: number) => {
    const current = respostas[qIndex] as number[];
    const newChecked = current.includes(optionIndex)
      ? current.filter((i) => i !== optionIndex)
      : [...current, optionIndex];

    const newRespostas = [...respostas];
    newRespostas[qIndex] = newChecked;
    setRespostas(newRespostas);
    console.log(newRespostas);
  };

  if (!form) {
    return <p className="p-10 text-xl text-red-500">Formulário não encontrado.</p>;
  }

  // Aqui Vamos dar um Post nas respostas para a API
  const handleSubmit = () => {
    console.log(`Gabarito das Respotas: ${JSON.stringify(respostas, null, 2)}`);
    router.push('/forms-page');
    toast.success('Formulário Respondido Com Sucesso!');
  };

  return (
    <div className="py-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <Link href="/forms-page" className="inline-flex">
        <h1 className="inline-flex gap-2 pl-6 sm:pl-20 pb-10 items-center text-3xl font-semibold text-azure-secondary hover:text-azure-footer transition-colors duration-300">
          <ArrowLeft /> Formulários
        </h1>
      </Link>
      <AnimatedContent inverse>
        <div className="bg-white rounded-3xl mx-6 sm:mx-20 py-10 px-8 sm:p-16">
          <section className="flex flex-col gap-6">
            <h1 className="text-2xl sm:text-5xl break-words border-b-1">{form.formTitulo}</h1>
            <p className="text-base sm:text-lg break-words border-b-1">{form.formDesc}</p>
          </section>
          <section className="py-10">
            <h1 className="text-xl sm:text-3xl font-semibold">Questões:</h1>
            {form.perguntas.map((pergunta, i) => (
              <div key={i} className="my-6 pb-4">
                <h2 className="text-base sm:text-2xl rounded-t-2xl bg-[#B7DAFF] border-b-1 p-2">
                  {i + 1}. {pergunta.titulo}
                </h2>
                <p className="mb-2 text-base sm:text-lg py-4">{pergunta.enunciado}</p>

                {pergunta.tipo === 'ESCOLHA_ÚNICA' && (
                  <div className="flex flex-col gap-2">
                    {pergunta.opcoes?.map((opcao, idx) => (
                      <label key={idx} className="flex gap-2 items-center">
                        <input
                          type="radio"
                          name={`pergunta-${i}`}
                          checked={respostas[i] === idx}
                          onChange={() => handleRadioChange(i, idx)}
                          className="cursor-pointer"
                        />
                        {opcao.label}
                      </label>
                    ))}
                  </div>
                )}

                {pergunta.tipo === 'MÚLTIPLA_ESCOLHA' && (
                  <div className="flex flex-col gap-2">
                    {pergunta.opcoes?.map((opcao, idx) => (
                      <label key={idx} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={(respostas[i] as number[]).includes(idx)}
                          onChange={() => handleCheckboxChange(i, idx)}
                          className="cursor-pointer"
                        />
                        {opcao.label}
                      </label>
                    ))}
                  </div>
                )}

                {pergunta.tipo === 'DISSERTATIVA' && (
                  <textarea
                    disabled
                    value={pergunta.resposta || ''}
                    className="w-full mt-2 border rounded p-2"
                    placeholder="Resposta dissertativa"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-center sm:justify-end pt-6">
              <button
                onClick={handleSubmit}
                className="btn-dafe btn-dafe-hover text-white px-4 py-2 text-lg sm:text-2xl"
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
