import { ProtectedPage } from '@/global/components/protectedPage';
import { UserPageData } from '@/modules/users/components/content';

export const metadata = {
  title: 'Perfil',
};

export default function UserPage() {
  return (
    <ProtectedPage>
      <UserPageData />
    </ProtectedPage>
  );
}
