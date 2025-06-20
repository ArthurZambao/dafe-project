"use client";

import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { FormQuestions } from '../form-questions/components/content';

type QuestionType = {
  id: string;
};

export function CreateFormData() {
  const [formQuestions, setFormQuestions] = useState<QuestionType[]>([
    { id: crypto.randomUUID() },
  ]);

  const addFormCount = () => {
    setFormQuestions((prev) => [...prev, { id: crypto.randomUUID() }]);
  };

  const removeFormQuestion = (idToRemove: string) => {
    setFormQuestions((prev) => prev.filter((q) => q.id !== idToRemove));
  };

  return (
    <div className="bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <section className="flex justify-between items-center pb-10 pt-20 px-34">
        <h1 className="text-4xl font-bold text-azure-secondary">Criar Formulário</h1>
        <button className="text-2xl text-white btn-dafe btn-dafe-hover px-4 py-2">
          Publicar Formulário
        </button>
      </section>

      <form className="flex flex-col bg-white gap-10 mx-34 mb-10 px-10 py-20 rounded-2xl">
        <section className="flex flex-col gap-10">
          <input
            type="text"
            placeholder="Título do Formulário"
            className="text-4xl border-b focus:outline-none focus:ring-0"
          />
          <textarea
            maxLength={50}
            rows={1}
            placeholder="Descrição do Formulário"
            className="text-xl border-b focus:outline-none focus:ring-0"
          ></textarea>
        </section>

        {formQuestions.map((question) => (
          <FormQuestions
            key={question.id}
            onDelete={() => removeFormQuestion(question.id)}
          />
        ))}

        <div className="flex justify-center">
          <CirclePlus
            onClick={addFormCount}
            size={30}
            className="cursor-pointer text-azure-primary hover:text-azure-secondary transition-colors duration-300"
          />
        </div>
      </form>
    </div>
  );
}
