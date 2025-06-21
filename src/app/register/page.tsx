import { AuthGate } from '@/global/components/authGate/authGate';
import { RegisterData } from '@/modules/register/components/content';

export const metadata = {
  title: 'Registrar-se',
};

export default function NoticesPage() {
  return (
    <AuthGate mode="guest" redirectTo='/users'>
      <RegisterData />
    </AuthGate>
  );
}
