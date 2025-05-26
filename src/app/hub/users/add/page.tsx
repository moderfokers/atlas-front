import { PageTitle } from "@/components/ui/page-title";
import { getUserAddView } from "@/domains/users/core/use-cases/getUserAddView.server";
import WUserForm from "@/domains/users/ui/wrappers/WUserForm";

export default async function AddUserPage() {
  const { data } = await getUserAddView();
  if (!data) return;

  return (
    <div className="mt-6">
      <PageTitle>Nuevo usuario</PageTitle>
      <WUserForm {...data} />
    </div>
  );
}
