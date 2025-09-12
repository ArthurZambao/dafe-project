import { AnimatedContent } from '@/global/animations/animatedContent';
import { CreatePostForm } from '../create-post-form';

export function CreatePostData() {
    return (
    <AnimatedContent inverse>
      <CreatePostForm/>      
    </AnimatedContent>
  );
}
