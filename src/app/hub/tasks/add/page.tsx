import { PageTitle } from "@/components/ui/page-title";
import WDailyForm from "@/domains/tasks/ui/wrappers/WDailyForm";

export default function AddTaskPage() {
  return (
    <div className="mt-6">
      <PageTitle>Nuevo taske</PageTitle>
      <WDailyForm />
    </div>
  );
}
