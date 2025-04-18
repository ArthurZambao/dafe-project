import { Input } from '@/global/components/FormComponents/FormInput';
import { CreateComplaintData, createComplaintSchema } from '../../schemas/create-complaint-schema';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { complaintOptions } from '../../constants/complaint-options';

export function ComplaintsData() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateComplaintData>({
    resolver: zodResolver(createComplaintSchema),
  });

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = (data: CreateComplaintData) => {
    try {
      // TODO: Fazer chamada para a API
      console.log(data);
      setSuccessMessage('Denúncia enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
    reset();
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <>
      <h1 className=" text-4xl sm:text-6xl font-bold text-[#007BFF] text-center my-10">
        Denunciar
      </h1>

      {successMessage && (
        <p className="text-center text-green-600 font-semibold text-lg mb-4">{successMessage}</p>
      )}

      <div className="mx-6 sm:mx-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border-4 border-[#007BFF] rounded-tr-3xl rounded-bl-3xl mx-auto w-full sm:w-[50rem] my-10 p-5"
        >
          <Input<CreateComplaintData>
            id="complaintTitle"
            label="Título da denúncia:"
            type="text"
            placeholder="Titulo12345"
            register={register}
            error={errors.complaintTitle}
          />

          <div className='w-full sm:w-[10rem]'>
            <Select<CreateComplaintData>
              id="selectComplaintTopic"
              label="Tópico:"
              register={register}
              error={errors.selectComplaintTopic}
              selectOptions={complaintOptions}
            />
          </div>

          <TextArea<CreateComplaintData>
            id="complaintMain"
            label="Sobre a denúncia:"
            placeholder="Digite a sua denúncia aqui..."
            register={register}
            error={errors.complaintMain}
            rows={7}
          />

          <div className="flex justify-center pt-8">
            <input
              type="submit"
              value="Criar Assunto"
              className="cursor-pointer bg-[#007BFF] text-xl sm:text-3xl font-bold text-white px-8 sm:px-20 py-4 rounded-tr-xl rounded-bl-xl"
            />
          </div>
        </form>
      </div>
    </>
  );
}
