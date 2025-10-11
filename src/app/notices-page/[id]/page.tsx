import { AuthGate } from '@/global/components/authGate/authGate';
import { NewsPageData } from '@/modules/news/components/content';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Notícia',
};

export default async function NewsPage({ params }: { params: Promise<{ slugify: string }> }) {
  const { slugify } = await params;
  return (
    <AuthGate mode={'auth'}>
      <NewsPageData newsSlugify={slugify} />
    </AuthGate>
  );
}
