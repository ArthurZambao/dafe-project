'use client';

import { FormattedDate } from "@/global/components/FormatedDate";
import { useCreatePosts } from "../../hooks/useCreatePost";
import { MediaForm } from "../media-form";
import { TextForm } from "../text-form";
import { UlPostDraftList } from "../ulDraftList";

export function CreatePostForm() {
  const hoje = new Date();
  const {
    register,
    errors,
    handleSubmit,
    activeTab,
    setActiveTab,
    drafts,
    handleSaveDraft,
    handleLoadDraft,
    deleteDraft,
    onSubmit,
    filePreviewUrl,
    fileName,
  } = useCreatePosts();

  return (
    <div className="flex justify-center px-4 sm:px-10 min-h-screen">
      <div className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-8 px-2 sm:px-8">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-azure-secondary">
            Criar Assunto
          </h2>
          <div>
            <h2 className="text-base text-center sm:text-lg font-semibold text-black mb-2">
              Rascunhos
            </h2>
            <UlPostDraftList
              drafts={drafts}
              handleLoadDraft={handleLoadDraft}
              deleteDraft={deleteDraft}
            />
          </div>
        </div>

        <div className="flex overflow-x-auto no-scrollbar gap-6 text-lg sm:text-xl text-azure-primary font-medium px-4 sm:px-8 mt-6 justify-center">
          <button
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'texto' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('texto')}
          >
            Texto
          </button>
          <button
            className={`cursor-pointer whitespace-nowrap ${
              activeTab === 'midia' ? 'border-b-2 border-azure-primary pb-1' : ''
            }`}
            onClick={() => setActiveTab('midia')}
          >
            Mídia
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-slate-gray px-4 sm:p-10 w-full max-w-4xl mx-auto"
        >
          {activeTab === 'texto' && <TextForm register={register} errors={errors} />}
          {activeTab === 'midia' && 
          <MediaForm 
            register={register} 
            errors={errors} 
            filePreviewUrl={filePreviewUrl}
            fileName={fileName}
          />}

          <div className="flex flex-col pt-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-end w-full">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="text-base sm:text-xl text-azure-primary px-4 sm:px-6 py-2 border-2 border-azure-primary rounded-xl"
              >
                Salvar Rascunho
              </button>
              <input
                type="submit"
                value="Criar Assunto"
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
