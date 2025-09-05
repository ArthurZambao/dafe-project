import { AuthGate } from '@/global/components/authGate/authGate';
import { CreateNoticesData } from '@/modules/create-notices/components/content';

export const metadata = {
  title: 'Criar Notícia',
};

export default function CreateNoticesPage() {
  <AuthGate mode="auth" role="professor">
    return <CreateNoticesData />;
  </AuthGate>;
}
