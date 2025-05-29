import { UserInfo } from '../user-info';
import { Tabs } from '../tabs/content';
export function UserPageData() {
  return (
    <>
      <div className="p-4 max-w-7xl min-h-screen mx-auto">
        <UserInfo />
        <Tabs />
      </div>
    </>
  );
}
