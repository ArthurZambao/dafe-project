import { FadeInUp } from '@/global/animations/fadeInUp';
import Image from 'next/image';
import { sections } from '../../constants/section';

export function Operation() {
  return (
    <section className="text-white py-10 gradient-bg w-full">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mt-14 mb-12 px-4">
        Como funciona o <br className="block sm:hidden" /> D.A.F.E
      </h2>
      <div className="flex flex-col items-center gap-4 sm:gap-8 px-4 max-w-[100rem] mx-auto">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <FadeInUp key={index} delay={index * 0.2}>
              <section className={`${isEven ? 'text-left' : 'text-right'} flex flex-col p-6`}>
                <h2>{section.title}</h2>
                <div>
                  <p className='leading-relaxed'>{section.text}</p>
                </div>
              </section>
            </FadeInUp>
          );
        })}
      </div>
    </section>
  );
}
