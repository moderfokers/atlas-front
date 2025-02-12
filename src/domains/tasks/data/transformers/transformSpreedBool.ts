import { IFetchResponse } from "@/services/RequestService";
import { IWDailyFormProps } from "../../ui/wrappers/WDailyForm";

export const transformSpreed = (props: IFetchResponse<IWDailyFormProps>) => {
  if (!props.data) return props;
  const { data } = props;
  return {
    ...props,
    data: {
      ...data,
      historyDailyControl: data.historyDailyControl.map((dailyControl) => ({
        ...dailyControl,
        spreed: (dailyControl.spreed as unknown as string) === "true",
      })),
    },
  } as IFetchResponse<IWDailyFormProps>;
};
