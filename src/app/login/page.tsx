import { AuthGate } from '@/global/components/authGate/authGate';
import { LoginData } from '@/modules/login/components/content';

export const metadata = {
  title: 'Login',
};

export default function SpaceCreate() {
  return (
    <AuthGate mode="guest" redirectTo='/users'>
      <LoginData />
    </AuthGate>
  );
}
