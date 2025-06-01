import { AuthGate } from "@/global/components/authGate/authGate";
import { EditUserData } from "@/modules/edit-user/components/content";


export default function EditUserPage() {
  return (
    <AuthGate mode="auth">
      <EditUserData />
    </AuthGate>
  );
}
