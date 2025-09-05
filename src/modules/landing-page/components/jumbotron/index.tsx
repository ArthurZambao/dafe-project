import { FadeInUp } from '@/global/animations/fadeInUp';

export function Jumbotron() {
  return (
    <FadeInUp delay={0}>
      <div className="gradient-bg text-white text-center sm:text-left py-28 px-8 sm:px-0">
        <h2 className="font-bold pl-0 sm:pl-20 text-xl sm:text-3xl pb-6">
          Transforme a Comunicação Escolar
        </h2>
        <p className="text-md sm:text-xl mx-2 sm:mx-10 pl-0 sm:pl-10 leading-relaxed	">
          O <span className="font-semibold">D.A.F.E</span> é uma plataforma inovadora que conecta
          alunos e instituições de
          <br className="hidden sm:block" />
          ensino de forma mais eficiente e transparente. Envie feedbacks, participe de{' '}
          <br className="hidden sm:block" />
          pesquisas e receba comunicados importantes com facilidade. Torne sua voz{' '}
          <br className="hidden sm:block" />
          parte da evolução do ambiente escolar.
        </p>
      </div>
    </FadeInUp>
  );
}
