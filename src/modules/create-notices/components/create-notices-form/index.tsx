'use client';

import { FormattedDate } from "@/global/components/FormatedDate";
import { useCreateNotices } from "../../hooks/useCreateNotices";
import { MediaNoticeForm, TextNoticeForm } from "../form-components";

export function CreateNoticesForm() {
  const hoje = new Date();
  const { register, handleSubmit, activeTab, setActiveTab, onSubmit, errors } = useCreateNotices();

  return (
    <div className="flex justify-center px-4 sm:px-10 min-h-screen">
      <div className="w-full">
        {/* Cabeçalho */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-8 px-2 sm:px-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
            Criar Notícia
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 text-lg sm:text-xl text-azure-primary font-medium px-4 sm:px-8 mt-6 justify-center">
          <button
            type="button"
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'texto' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('texto')}
          >
            Texto
          </button>
          <button
            type="button"
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'midia' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('midia')}
          >
            Mídia
          </button>
        </div>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-slate-gray px-4 sm:p-10 w-full max-w-4xl mx-auto"
        >
          {activeTab === 'texto' && <TextNoticeForm register={register} errors={errors} />}
          {activeTab === 'midia' && <MediaNoticeForm register={register} errors={errors} />}

          {/* Botões e Data */}
          <div className="flex flex-col pt-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-end w-full">
              <input
                type="submit"
                value="Publicar Notícia"
                className="btn-dafe btn-dafe-hover text-base sm:text-xl font-bold text-white px-5 sm:px-10 py-2 rounded-tl-xl rounded-br-xl"
              />
            </div>

            <p className="text-center sm:text-right pt-4 pb-10 sm:pb-0">
              Publicar em:{' '}
              <span className="font-bold">
                <FormattedDate date={hoje} />
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
