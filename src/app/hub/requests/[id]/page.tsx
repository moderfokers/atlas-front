import { PageTitle } from "@/components/ui/page-title";
import { getRequestEditView } from "@/domains/requests/core/use-cases/editRequestView.server";

import WTaskForm from "@/domains/requests/ui/wrappers/WTaskForm";

interface IEditRequestPageProps {
  params: {
    id: string;
  };
}

export default async function EditRequestPage({
  params,
}: IEditRequestPageProps) {
  const request = await getRequestEditView({ id: Number(params.id) });
  if (!request.data) return;

  return (
    <div className="mt-6">
      <PageTitle>Nueva asignación</PageTitle>
      <WTaskForm {...request.data} />
    </div>
  );
}
