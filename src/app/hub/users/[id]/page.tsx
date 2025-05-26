import { PageTitle } from "@/components/ui/page-title";
import { getUserEditView } from "@/domains/users/core/use-cases/getUserEditView.server";
import WUserForm from "@/domains/users/ui/wrappers/WUserForm";

interface IEditUserPageProps {
  params: {
    id: string;
  };
}

export default async function EditUserPage({ params }: IEditUserPageProps) {
  const { data } = await getUserEditView(params.id);
  if (!data) return;

  return (
    <div className="mt-6">
      <PageTitle>Editar usuario</PageTitle>
      <WUserForm {...data} />
    </div>
  );
}
