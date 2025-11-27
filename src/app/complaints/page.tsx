import { AuthGate } from '@/global/components/authGate/authGate';
import { ComplaintsPageData } from '@/modules/complaints/components/content';

export const metadata = {
  title: 'Ouvidoria',
};

export default function ComplaintsPage() {
  return(
  <AuthGate mode="auth">
    <ComplaintsPageData />
  </AuthGate>
  );
}
