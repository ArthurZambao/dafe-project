import { objectives } from '../../constants/objectives';

export function MainObjectives() {
  return (
    <section className="py-20 px-4 md:px-20">
      <h2 className="text-3xl font-bold text-center text-[#007BFF] mb-12">Principais objetivos</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 font-semibold w-full max-w-6xl mx-auto px-2">
        {objectives.map((objetivo, index) => (
          <div
            key={index}
            className="bg-[#007BFF] text-white text-center rounded-bl-[1.5rem] md:rounded-bl-[2.5rem] lg:rounded-bl-[4rem] rounded-tr-[1.5rem] md:rounded-tr-[2.5rem] lg:rounded-tr-[4rem] h-[9rem] sm:h-[10rem] md:h-[12rem] lg:h-[15rem] w-full flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-2xl mb-2 px-1">{objetivo.titulo}</h3>
            <p className="leading-relaxed text-sm px-4">{objetivo.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
