
import { AuthGate } from '@/global/components/authGate/authGate';
import { FormsPageData } from '@/modules/forms-page/components/content';

export const metadata = {
  title: 'Formulários',
};

export default function FormsPage() {
  return (
    <AuthGate mode="auth">
      <FormsPageData />
    </AuthGate>
  );
}
