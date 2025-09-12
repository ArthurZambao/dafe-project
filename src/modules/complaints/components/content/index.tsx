import { AnimatedContent } from '@/global/animations/animatedContent';
import { ComplaintsForm } from '../complaints-form';

export function ComplaintsData() {
  return (
    <AnimatedContent inverse>
      <ComplaintsForm />
    </AnimatedContent>
  );
}
