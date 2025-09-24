import { AnimatedContent } from '@/global/animations/animatedContent';
import { NoticesFilterCard } from '../notices-filter-card';
import { NoticesList } from '../notices-list';

export function NoticesPageData() {

  return (
    <AnimatedContent inverse>
      <div className="w-full px-6 sm:px-10 md:px-20 lg:px-40 py-10">
        <NoticesFilterCard />  
        <NoticesList /> 
      </div>
    </AnimatedContent>
  );
}
