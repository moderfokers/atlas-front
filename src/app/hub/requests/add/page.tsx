import { PageTitle } from "@/components/ui/page-title";
import { getRequestAddView } from "@/domains/requests/core/use-cases/addRequestView.server";
import WRequestForm from "@/domains/requests/ui/wrappers/WRequestForm";

export default async function AddRequestPage() {
  const result = await getRequestAddView();

  if (!result.data) return;

  return (
    <div className="mt-6">
      <PageTitle>Nueva solicitud</PageTitle>
      <WRequestForm {...result.data} />
    </div>
  );
}
