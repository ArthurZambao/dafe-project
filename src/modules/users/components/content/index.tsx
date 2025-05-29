import { UserInfo } from '../user-info';
import { Tabs } from '../tabs/content';
import { AnimatedContent } from '@/global/animations/animatedContent';
export function UserPageData() {
  return (
    <AnimatedContent inverse>
      <div className="p-4 max-w-7xl min-h-screen mx-auto">
        <UserInfo />
        <Tabs />
      </div>
    </AnimatedContent>
  );
}
