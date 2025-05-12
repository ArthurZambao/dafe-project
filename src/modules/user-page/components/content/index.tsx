import { useAuthGuard } from '@/hooks/useAuthGuard';
import { UserInfo } from '../user-info';
import { Tabs } from '../tabs/content';
export function UserPageData() {
  useAuthGuard();
  
  return (
    <div className="p-4 max-w-7xl min-h-screen mx-auto">
      <UserInfo />
      <Tabs />
    </div>
  );
}
