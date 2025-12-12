import { AuthGate } from '@/global/components/authGate/authGate';
import { NewsPageData } from '@/modules/news/components/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Notícia',
};

export default async function NewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <AuthGate mode={'auth'}>
      <NewsPageData id={id} />
    </AuthGate>
  );
}
