import { AnimatedContent } from '@/global/animations/animatedContent';
import { NoticesFilterCard } from '../notices-filter-card';
import { NoticesList } from '../notices-list';
import { MainNotices } from '../main-notices';

export function NoticesPageData() {

  return (
    <AnimatedContent inverse>
      <div className="w-full py-10">
        <NoticesFilterCard />
        <MainNotices />
        <NoticesList /> 
      </div>
    </AnimatedContent>
  );
}
