import { NoticesPageData } from "@/modules/notices-page/components/content";
import { AuthGate } from "@/global/components/authGate/authGate";

export const metadata = {
  title: 'Notícias',
};

export default function NoticesPage() {
  return (
  <AuthGate mode="auth">
      <NoticesPageData />
  </AuthGate>
  );
}
