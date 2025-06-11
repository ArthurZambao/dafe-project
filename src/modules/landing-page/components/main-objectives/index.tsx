import { FadeInUp } from '@/global/animations/fadeInUp';
import { objectives } from '../../constants/objectives';

export function MainObjectives() {
  return (
      <section className="py-20 px-4 md:px-20">
        <h2 className="text-5xl font-bold text-center text-azure-primary mb-12">
          Principais objetivos
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 font-semibold w-full max-w-6xl mx-auto px-2">
          {objectives.map((objetivo, index) => (
            <FadeInUp key={index} delay={index * 0.12}>
              <div className="bg-azure-secondary text-white text-center rounded-lg h-[16rem] sm:h-[18.5rem] md:h-[21.5rem] lg:h-[20rem] w-full flex flex-col items-center justify-center card-shadow transition-shadow ">
                <h3 className="font-bold text-2xl mb-2 px-1 pb-4">{objetivo.titulo}</h3>
                <p className="leading-relaxed text-sm px-4">{objetivo.descricao}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </section>
  );
}
