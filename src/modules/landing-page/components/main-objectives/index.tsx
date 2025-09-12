import { FadeInUp } from '@/global/animations/fadeInUp';
import { objectives } from '../../constants/objectives';
import { SlideIn } from '@/global/animations/slideIn';

export function MainObjectives() {
  return (
    <section className="py-20 px-4 md:px-20">
      <FadeInUp delay={0.2}>
        <h2 className="text-5xl font-bold text-center text-azure-primary mb-12">
          Principais objetivos
        </h2>
      </FadeInUp>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-16 font-semibold w-full max-w-6xl mx-auto px-2">
        {objectives.map((objetivo, index) => (
          <SlideIn key={index} delay={2} from='left'>
            <div className="bg-white shadow-xl text-white text-center rounded-lg h-[16rem] sm:h-[18.5rem] md:h-[21.5rem] lg:h-[20rem] w-full flex flex-col items-center justify-center card-shadow transition-shadow ">
              <h3 className="font-bold text-[#0B4079] text-2xl mx-4 mb-2 pb-4 border-b-1">{objetivo.titulo}</h3>
              <p className="leading-relaxed text-[#4B4B4B] text-sm px-4">{objetivo.descricao}</p>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  );
}
