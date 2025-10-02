import { AnimatedContent } from '@/global/animations/animatedContent';
import { EditUserForm } from '../edit-user-form';

export function EditUserData() {
  return (
    <AnimatedContent inverse>
      <EditUserForm />      
    </AnimatedContent>
  );
}
