import { CreateNoticeDataSchema } from '../../schemas/create-notices-schema';
import { Input } from '@/global/components/FormComponents/FormInput';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CommonFormProps {
  register: UseFormRegister<CreateNoticeDataSchema>;
  errors: FieldErrors<CreateNoticeDataSchema>;
}

interface MediaFormProps extends CommonFormProps {
  filePreviewUrl?: string | null; 
}

export function TextNoticeForm({ register, errors }: CommonFormProps) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 pt-10 sm:pt-0">
        <div className="w-full flex flex-col gap-2">
          <Input<CreateNoticeDataSchema>
            id="titulo" 
            label="Título:"
            type="text"
            maxlength={50}
            placeholder="Título do seu assunto"
            register={register}
            error={errors.titulo}
          />

          <TextArea<CreateNoticeDataSchema>
            id="descricao"
            label="Descrição:"
            maxlength={100}
            placeholder="Digite a descrição aqui..."
            register={register}
            error={errors.descricao}
            rows={2}
          />
        </div>
      </div>
      <div className="py-2 sm:py-6">
        {/* Atualizado para 'conteudo' */}
        <TextArea<CreateNoticeDataSchema>
          id="conteudo"
          label="Assunto (Conteúdo):"
          maxlength={800} // Aumentei um pouco
          placeholder="Digite o conteúdo completo aqui..."
          register={register}
          error={errors.conteudo}
          rows={10}
        />
      </div>
    </>
  );
}

export function MediaNoticeForm({ register, errors, filePreviewUrl }: MediaFormProps) {
  return (
    <div className="py-6 flex flex-col gap-6 items-center">
        <h3 className="text-xl text-azure-primary font-medium w-full text-left">Imagem de Capa</h3>
        
        <div className="w-full flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <label 
              htmlFor="anexos" 
              className="cursor-pointer flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-azure-primary rounded-lg hover:bg-blue-50 transition-colors"
            >
              <span className="text-slate-gray font-medium text-lg">Clique para escolher imagem</span>
              <span className="text-sm text-gray-400 mt-2">(JPG, PNG, WEBP - Max 5MB)</span>
              
              <input
                id="anexos"
                type="file"
                accept="image/*"
                className="hidden"
                {...register('anexos')}
              />
            </label>
            {errors.anexos && (
              <span className="text-red-500 text-sm mt-2 block text-center">
                {errors.anexos.message as string}
              </span>
            )}
          </div>

          <div className="w-full sm:w-1/2 flex items-center justify-center">
            {filePreviewUrl ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 shadow-md">
                <img 
                  src={filePreviewUrl} 
                  alt="Preview da capa" 
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-48 bg-gray-100 rounded-lg text-gray-400 border border-gray-200">
                Sem imagem selecionada
              </div>
            )}
          </div>
        </div>
    </div>
  );
}