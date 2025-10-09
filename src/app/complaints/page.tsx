import { AuthGate } from '@/global/components/authGate/authGate';
import { ComplaintsPageData } from '@/modules/complaints/components/content';

export const metadata = {
  title: 'Denúncias',
};

export default function ComplaintsPage() {
  return(
  <AuthGate mode="auth" role="student">
    <ComplaintsPageData />
  </AuthGate>
  );
}
