'use client';

import { Input } from '@/global/components/FormComponents/FormInput';
import { CreateComplaintData, createComplaintSchema } from '../../schemas/create-complaint-schema';
import { TextArea } from '@/global/components/FormComponents/FormTextArea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select } from '@/global/components/FormComponents/FormSelect';
import { complaintOptions } from '../../constants/complaint-options';
import axios from 'axios';

export function ComplaintsData() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateComplaintData>({
    resolver: zodResolver(createComplaintSchema),
  });


  const onSubmit = async (data: CreateComplaintData) => {
    try {
      await axios.post('http://localhost:3030/complaints', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);    
      reset();

    } catch (error) {
      console.error('Erro ao enviar dados:', error);

    }
  };

  return (
    <div className="min-h-screen">
      <h1 className=" text-4xl sm:text-6xl font-bold text-[#007BFF] text-center my-10">
        Denunciar
      </h1>

      <div className="mx-6 sm:mx-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 border-4 border-[#007BFF] rounded-tr-3xl rounded-bl-3xl mx-auto w-full sm:w-[50rem] my-5 p-10"
        >
          <Input<CreateComplaintData>
            id="titulo"
            label="Título da denúncia:"
            type="text"
            placeholder="Titulo12345"
            register={register}
            error={errors.titulo}
          />

          <div className="w-full sm:w-[10rem]">
            <Select<CreateComplaintData>
              id="topico"
              label="Tópico:"
              register={register}
              error={errors.topico}
              selectOptions={complaintOptions}
            />
          </div>

          <TextArea<CreateComplaintData>
            id="conteudo"
            label="Sobre a denúncia:"
            placeholder="Digite a sua denúncia aqui..."
            register={register}
            error={errors.conteudo}
            rows={7}
          />

          <div className="flex justify-center pt-8">
            <input
              type="submit"
              value="Fazer Denúncia"
              className="cursor-pointer bg-[#007BFF] text-xl sm:text-3xl font-bold text-white px-8 sm:px-20 py-4 rounded-tr-xl rounded-bl-xl"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
