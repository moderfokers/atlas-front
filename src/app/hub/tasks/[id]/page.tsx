import { PageTitle } from "@/components/ui/page-title";
import { ServerError } from "@/components/ui/server-error";
import { getEditTaskView } from "@/domains/tasks/core/use-cases/getEditTaskView.server";
import WDailyForm from "@/domains/tasks/ui/wrappers/WDailyForm";

interface IEditTaskPageProps {
  params: {
    id: string;
  };
}

export default async function EditTaskPage({ params }: IEditTaskPageProps) {
  const response = await getEditTaskView(params.id);

  if (!response?.data) return <ServerError error={response?.error} />;

  return (
    <div className="mt-6">
      <PageTitle>Control diario</PageTitle>
      <WDailyForm {...response.data} />
    </div>
  );
}
