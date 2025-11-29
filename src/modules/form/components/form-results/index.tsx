'use client';

import { useEffect, useState } from 'react';
import { getFormResults } from '@/libs/services/forms/formService';
import { FormResultsAPI } from '@/types/formResults';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface FormResultsProps {
  formId: string;
}

export function FormResults({ formId }: FormResultsProps) {
  const [data, setData] = useState<FormResultsAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getFormResults(formId);
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar resultados. Verifique se você tem permissão.');
      } finally {
        setLoading(false);
      }
    }

    if (formId) fetchData();
  }, [formId]);

  if (loading)
    return <div className="p-20 text-center text-xl text-slate-gray">Carregando respostas...</div>;
  if (error) return <div className="p-20 text-center text-xl text-red-500">{error}</div>;
  if (!data) return <div className="p-20 text-center text-xl">Nenhum dado encontrado.</div>;

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto min-h-screen animate-fade-in">
      <Link
        href="/forms-page"
        className="inline-flex items-center gap-2 text-azure-secondary font-semibold mb-6 hover:opacity-80 transition-opacity"
      >
        <ArrowLeft /> Voltar para Formulários
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-8 border-azure-primary">
        <h1 className="text-3xl sm:text-4xl font-bold text-azure-secondary mb-2">
          {data.formTitulo}
        </h1>
        <p className="text-slate-gray text-lg">
          Total de Submissões:{' '}
          <span className="font-bold text-azure-primary text-2xl ml-2">{data.totalRespostas}</span>
        </p>
      </div>

      {data.results.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500">Nenhum aluno respondeu a este formulário ainda.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {data.results.map((submissao, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Cabeçalho do Aluno */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-azure-primary/10">
                    <Image
                      src={submissao.responder.imageUrl || '/icons/user-icon.svg'}
                      alt={`Foto de ${submissao.responder.nome}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-azure-primary">
                      {submissao.responder.nome}
                    </h3>
                    <p className="text-sm text-gray-500">{submissao.responder.email}</p>
                  </div>
                </div>
                <span className="text-sm bg-gray-100 px-4 py-2 rounded-full text-gray-600 font-medium">
                  Enviado em: {new Date(submissao.dataResposta).toLocaleString()}
                </span>
              </div>

              {/* Lista de Respostas */}
              <div className="flex flex-col gap-4 pl-0 sm:pl-4">
                {submissao.respostasDetalhadas.map((resp, i) => (
                  <div key={i} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <p className="font-bold text-slate-gray mb-2 flex gap-2">
                      <span className="text-azure-primary">Q{i + 1}.</span> {resp.enunciado}
                    </p>
                    <div className="pl-4 border-l-4 border-azure-secondary">
                      <p className="text-lg text-black font-medium">
                        {Array.isArray(resp.respostaSubmetida)
                          ? resp.respostaSubmetida.join(', ')
                          : resp.respostaSubmetida || (
                              <span className="text-gray-400 italic">Sem resposta</span>
                            )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
