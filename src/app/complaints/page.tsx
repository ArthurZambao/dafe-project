import { AuthGate } from '@/global/components/authGate/authGate';
import { ComplaintsData } from '@/modules/complaints/components/content';

export const metadata = {
  title: 'Denúncias',
};

export default function CreateTopicPage() {
  <AuthGate mode="auth" role="student">
    return <ComplaintsData />;
  </AuthGate>;
}
