import Link from 'next/link';
import { formsMock } from '../../constants/forms-mock';
import { AnimatedContent } from '@/global/animations/animatedContent';

export function FormsPageData() {
  return (
    <AnimatedContent inverse>
      <section className="bg-azure-primary w-full ">
        <h1 className="text-center text-6xl py-10 text-white font-bold">Formulários</h1>
      </section>
      <section className="pt-20 min-h-screen">
        {formsMock.map((form) => (
          <Link href="*" key={form.id}>
            <div className="text-center cursor-pointer hover:bg-light-dafe-gray p-6 mb-4 max-w-md mx-auto rounded-3xl transition-all duration-300">
              <h2 className="text-azure-primary text-3xl font-bold mb-2">{form.title}</h2>
              <p className="text-slate-gray">{form.description}</p>
              <p className="text-slate-gray text-sm mb-4">
                de: <span className="font-bold">{form.data_inicial}</span> até:{' '}
                <span className="font-bold">{form.data_final}</span>
              </p>
            </div>
          </Link>
        ))}
      </section>
    </AnimatedContent>
  );
}
