import { IDailyControl } from "../../data/entities";

export const buildDailyForm = (_values: IDailyControl, taskId: number) => {
  const formData = new FormData();

  const { initialCounterImage, finalCounterImage, ...values } = _values;

  const newValues = {
    ...values,
    taskId,
    spreed: `${values.spreed}`,
    date: values.date?.toISOString(),
  };

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
