import { AuthGate } from '@/global/components/authGate/authGate';
import { UserPageData } from '@/modules/users/components/content';

export const metadata = {
  title: 'Perfil',
};

export default function UserPage() {
  return (
    <AuthGate mode="auth">
      <UserPageData />
    </AuthGate>
  );
}
