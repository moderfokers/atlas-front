import React from "react";
import {
  IAbstractSelectProps,
  TGenericOptions,
} from "../../ui/wrappers/WSelect";
import { injectValueInList, isStringArray } from "@/lib/utils";

export const useTransformOptions = <T,>(
  props: IAbstractSelectProps<T>,
  form: any
) => {
  const { name, options: _options } = props;
  const options = React.useMemo(() => {
    if (isStringArray(_options))
      return injectValueInList(_options, form.getValues(name));
    return _options;
  }, [_options]);

  return options;
};
