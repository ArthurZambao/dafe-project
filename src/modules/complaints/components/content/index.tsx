import { AnimatedContent } from '@/global/animations/animatedContent';
import { ComplaintsForm } from '../complaints-form';

export function ComplaintsPageData() {
  return (
    <AnimatedContent inverse>
      <ComplaintsForm />
    </AnimatedContent>
  );
}
