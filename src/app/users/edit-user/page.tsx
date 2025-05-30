import { ProtectedPage } from "@/global/components/protectedPage";
import { EditUserData } from "@/modules/edit-user/components/content";


export default function EditUserPage() {
  return (
    <ProtectedPage>
      <EditUserData />
    </ProtectedPage>
  );
}
