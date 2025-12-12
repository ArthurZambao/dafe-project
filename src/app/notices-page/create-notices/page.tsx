import { AuthGate } from '@/global/components/authGate/authGate';
import { CreateNoticesData } from '@/modules/create-notices/components/content';

export const metadata = {
  title: 'Criar Notícia',
};

export default function CreateNoticesPage() {
  return (
    <AuthGate mode="auth">
      <CreateNoticesData/>
    </AuthGate>
  );
}