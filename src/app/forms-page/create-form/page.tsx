import { AuthGate } from '@/global/components/authGate/authGate';
import { CreateFormData } from '@/modules/create-form/components/content';

export const metadata = {
  title: 'Criar Formulário',
};

export default function CreateFormPage() {
  return (
    <AuthGate mode="auth" role="professor">
      <CreateFormData />
    </AuthGate>
  );
}
