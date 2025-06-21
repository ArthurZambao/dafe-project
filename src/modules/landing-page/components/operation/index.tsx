import { FadeInUp } from '@/global/animations/fadeInUp';
import Image from 'next/image';

export function Operation() {
  const sections = [
    {
      title: 'Cadastro simples',
      text: (
        <>
          <span className="font-bold">O cadastro é rápido e fácil.</span>Criar uma conta no
          aplicativo é fácil e leva apenas alguns minutos. Os alunos informam dados básicos, como
          nome completo, turma e email institucional, garantindo uma identificação segura e
          personalizada. Com o cadastro concluído, já podem acessar todas as funcionalidades da
          plataforma e começar a interagir com a escola de forma prática e eficiente.
        </>
      ),
      image: '/images/operation-image-1.png',
    },
    {
      title: 'FeedBack Constante',
      text: (
        <>
          <span className="font-bold">A sua opinião é fundamental.</span> Por meio de feedbacks
          regulares, aprimoramos continuamente a plataforma, ajustando cada detalhe para torná-la
          mais eficiente, transparente e alinhada às suas necessidades. Além disso, os formulários
          de feedback periódicos garantem que cada aluno tenha voz ativa no processo de melhoria do
          ambiente escolar. Suas sugestões e críticas são analisadas com atenção e transformadas em
          ações concretas, promovendo um espaço mais justo, colaborativo e centrado no estudante.
        </>
      ),
      image: '/images/operation-image-1.png',
    },
    {
      title: 'Receba Comunicados',
      text: (
        <>
          <span className="font-bold">Fique sempre por dentro das novidades da escola!</span>{' '}
          Comunicados importantes, como avisos sobre eventos, reuniões, mudanças no calendário e
          atualizações gerais, serão enviados diretamente para o seu celular ou computador. Assim,
          você não perde nenhuma informação relevante e pode se organizar com facilidade e rapidez.
        </>
      ),
      image: '/images/operation-image-1.png',
    },
  ];

  return (
    <section className="text-white py-10 bg-azure-primary w-full">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mt-20 mb-20 px-4">
        Como funciona o <br className="block sm:hidden" /> D.A.F.E
      </h2>

      <div className="flex flex-col items-center gap-20 px-4 max-w-[100rem] mx-auto">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <FadeInUp key={index} delay={index * 0.2}>
              <div
                className={`flex flex-col ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } items-center gap-10 sm:gap-[8rem] py-8`}
              >
                <div className="sm:w-1/2 px-2 text-center sm:text-left">
                  <h3
                    className={`text-xl sm:text-3xl font-bold mb-4 ${isEven ? 'text-left' : 'text-right'}`}
                  >
                    {section.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-lg leading-relaxed ${isEven ? 'text-left' : 'text-right'}`}
                  >
                    {section.text}
                  </p>
                </div>
                <div className="relative w-full sm:w-1/2 h-64 sm:h-[300px]">
                  <Image
                    src={section.image}
                    alt={`Ilustração - ${section.title}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 500px"
                    priority
                  />
                </div>
              </div>
            </FadeInUp>
          );
        })}
      </div>
    </section>
  );
}
