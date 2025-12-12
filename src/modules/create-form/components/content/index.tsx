import { AnimatedContent } from '@/global/animations/animatedContent';
import { CreateForm } from '../create-form';

export function CreateFormData() {
  return (
    <div className="p-4 sm:p-10 min-h-screen bg-[url(/svgs/bg-blur-login.svg)] bg-cover bg-center bg-no-repeat">
      <AnimatedContent inverse>
        <CreateForm />
      </AnimatedContent>
    </div>
  );
}
