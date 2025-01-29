import { IFetchResponse } from "@/services/RequestService";
import { IWDailyFormProps } from "../../ui/wrappers/WDailyForm";

export const transformDate = (props: IFetchResponse<IWDailyFormProps>) => {
  if (!props.data) return props;
  const { data } = props;
  return {
    ...props,
    data: {
      ...data,
      historyDailyControl: data.historyDailyControl.map((dailyControl) => ({
        ...dailyControl,
        date: dailyControl.date
          ? new Date(dailyControl.date as unknown as string)
          : null,
      })),
    },
  } as IFetchResponse<IWDailyFormProps>;
};
