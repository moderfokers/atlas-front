import { useFormStore } from "@/domains/shared/form/core/hooks/useFormStore";
import { useToast } from "@/hooks/useToast";
import { IGenericOutput } from "@/hooks/useFetch";
import { useShallow } from "zustand/shallow";

export interface ICRUDHandler<O> {
  handler?: (result: IGenericOutput<O>) => void;
  message: string;
}

export interface ICRUD<I, O> {
  action: (args: I) => Promise<IGenericOutput<O>>;
  onSuccess: ICRUDHandler<O>;
  onError?: ICRUDHandler<O>;
}

export interface ICRUDHandlerProps<I, O = void> {
  edit?: ICRUD<I, O>;
  add?: ICRUD<I, O>;
  delete?: ICRUD<I, O>;
}

interface ICRUDInput<I, O> extends ICRUD<I, O> {
  input: I;
}

export const useCrudHandler = <ServerInput, ServerOutput = void>({
  edit: _edit,
  add: _add,
  delete: _delete,
}: ICRUDHandlerProps<ServerInput, ServerOutput>) => {
  const { toast } = useToast();

  const { setIsFetching } = useFormStore(
    useShallow((state) => ({
      setIsFetching: state.setIsFetching,
    }))
  );

  const onErrorHandler = (
    result: IGenericOutput<ServerOutput>,
    onError?: ICRUDHandler<ServerOutput>
  ) => {
    toast({
      variant: "destructive",
      description:
        onError?.message ||
        "Ocurrio un error conectando al servidor, intente más tarde",
    });

    if (onError?.handler) onError.handler(result);
  };

  const onSuccessHandler = (
    result: IGenericOutput<ServerOutput>,
    onSuccess: ICRUDHandler<ServerOutput>
  ) => {
    toast({
      variant: "success",
      description: onSuccess.message,
    });

    if (onSuccess?.handler) onSuccess.handler(result);
  };

  const execute = async ({
    input,
    action,
    onSuccess,
    onError,
  }: ICRUDInput<ServerInput, ServerOutput>) => {
    setIsFetching(true);
    try {
      const result = await action(input);
      if (!result) return;
      if (result.status >= 400) {
        onErrorHandler(result, onError);
      } else {
        onSuccessHandler(result, onSuccess);
      }
    } catch (error) {
      onErrorHandler({ error: error as string, status: 500 }, onError);
    } finally {
      setIsFetching(false);
    }
  };

  return {
    add: (input: ServerInput) => _add && execute({ input, ..._add }),
    edit: (input: ServerInput) => _edit && execute({ input, ..._edit }),
    delete: (input: ServerInput) => _delete && execute({ input, ..._delete }),
  };
};
