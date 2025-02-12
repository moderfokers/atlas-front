import { IDailyControl } from "../../ui/wrappers/WDailyForm";

export const bulidDailyForm = (_values: IDailyControl, taskId: number) => {
  const formData = new FormData();

  const { initialCounterImage, finalCounterImage, ...values } = _values;

  const newValues = {
    ...values,
    taskId,
    isDraft: Boolean(values?.isDraft),
    spreed: `${values.spreed}`,
    date: values.date?.toISOString(),
  };

  debugger;

  // values.taskId = task?.id;
  // values.isDraft = Boolean(values?.isDraft);

  // values.initialCounterImage = null;
  // values.finalCounterImage = null;

  const valuesBlob = new Blob([JSON.stringify(newValues)], {
    type: "application/json",
  });

  formData.append("data", valuesBlob);
  if (initialCounterImage)
    formData.append("initialPhoto", initialCounterImage as File);
  if (finalCounterImage)
    formData.append("finalPhoto", finalCounterImage as File);

  return formData;
};
