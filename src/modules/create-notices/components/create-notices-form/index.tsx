import { CreateNoticesHeaderCard } from "../create-notices-header-card";
import { CreateFormInput, CreateFormTextarea } from "../form-components";
import { useCreateNotices } from "../../hooks/useCreateNotices";

export function CreateNoticesForm() {
  const { formRef, register, handleSubmit, onSubmit } = useCreateNotices();

  return (
    <div className="p-4 sm:p-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <CreateNoticesHeaderCard formRef={formRef} />
      <section>
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10 bg-white p-10 rounded-2xl mx-0 sm:mx-10"
        >
          <div className="flex justify-between">
            <section className="flex flex-col gap-8">
              <CreateFormInput
                isFormHeader={true}
                register={register}
                name="NoticiaTitulo"
                placeholder="Título da Notícia"
              />
              <CreateFormTextarea
                rows={1}
                register={register}
                name="noticiaDesc"
                placeholder="Descrição da notícia"
              />
            </section>
            {/* <CreateFormImageInput
              register={register}
              name="imagem"
              placeholder="Adicione a Imagem da Notícia"
            /> */}
          </div>
          <section>
            <CreateFormTextarea
              rows={10}
              register={register}
              name="noticiaConteudo"
              placeholder="Conteúdo da notícia"
            />
          </section>
        </form>
      </section>
    </div>
  );
}
