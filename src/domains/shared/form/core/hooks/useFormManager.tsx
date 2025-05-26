/* eslint-disable @typescript-eslint/no-explicit-any */
import { useShallow } from "zustand/shallow";
import { useFormStore } from "./useFormStore";
import { useEffect } from "react";

export const useFormManager = (form: any) => {
  const { setForm, setIsFetching } = useFormStore(
    useShallow((state) => ({
      setForm: state.setForm,
      setIsFetching: state.setIsFetching,
    }))
  );

  useEffect(() => {
    setForm(form);

    return () => {
      setForm(null);
    };
  }, []);

  return { setForm, setIsFetching };
};
