import { FadeInUp } from '@/global/animations/fadeInUp';
import Image from 'next/image';
import { sections } from '../../constants/section';

export function Operation() {

  return (
    <section className="text-white py-10 gradient-bg w-full">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mt-14 mb-12 px-4">
        Como funciona o <br className="block sm:hidden" /> D.A.F.E
      </h2>
      <div className="flex flex-col items-center gap-10 px-4 max-w-[100rem] mx-auto">
        {sections.map((section, index) => {
          const isEven = index % 2 === 0;
          return (
            <FadeInUp key={index} delay={index * 0.2}>
              <div
                className={`flex flex-col ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  } items-center sm:gap-[8rem] py-8`}
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
                <div className="rounded-3xl overflow-hidden">
                  <Image
                    src={section.image}
                    alt={`Ilustração - ${section.title}`}
                    width={600}
                    height={360}
                    className={`object-contain rounded-3xl ${isEven ? 'ml-32' : 'mr-32'}`}
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
