'use client';

import { FormattedDate } from '@/global/components/FormatedDate';
import { Input } from '@/global/components/FormComponents/FormInput';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { complaintOptions } from '../../constants/complaint-options';
import { CreateComplaintData } from '../../schemas/create-complaint-schema';
import { ComplaintsHeaderCard } from '../complaints-header-card';
import { useComplaintsForm } from '../../hooks/useComplaintsForm';

export function ComplaintsForm() {
  const {
    hoje,
    register,
    errors,
    handleSubmit,
    drafts,
    handleSaveDraft,
    handleLoadDraft,
    deleteDraft,
    onSubmit,
  } = useComplaintsForm();

  return (
    <div className="flex justify-center px-4 sm:px-10 min-h-screen">
      <div className="w-full">
        <ComplaintsHeaderCard
          drafts={drafts}
          handleLoadDraft={handleLoadDraft}
          deleteDraft={deleteDraft}
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-slate-gray px-4 py-10 p-10 w-full max-w-4xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full flex flex-col gap-2">
              <Input<CreateComplaintData>
                id="titulo"
                label="Título:"
                type="text"
                maxlength={50}
                placeholder="Título da reclamação"
                register={register}
                error={errors.titulo}
              />
              <div className="w-auto inline-block">
                <Select<CreateComplaintData>
                  id="topico"
                  label="Tópico:"
                  register={register}
                  error={errors.topico}
                  selectOptions={complaintOptions}
                />
              </div>
            </div>
          </div>

          <div className="py-6">
            <TextArea<CreateComplaintData>
              id="conteudo"
              label="Conteúdo:"
              maxlength={300}
              placeholder="Digite sua reclamação aqui..."
              register={register}
              error={errors.conteudo}
              rows={10}
            />
          </div>

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
                value="Fazer Reclamação"
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
