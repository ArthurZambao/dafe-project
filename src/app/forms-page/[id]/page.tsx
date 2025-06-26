import { AuthGate } from '@/global/components/authGate/authGate';
import { FormPageData } from '@/modules/form/components/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Responder Formulário',
};

export default async function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AuthGate mode={'auth'}>
      <FormPageData formId={id} />
    </AuthGate>
  );
}
