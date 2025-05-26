import { useToast } from "@/hooks/useToast";
import { IGenericOutput } from "@/hooks/useFetch";

export const useInvalidCredentials = () => {
  const { toast } = useToast();
  const checkResponse = (result: { status: number }) => {
    if (result.status !== 401) return;

    toast({
      variant: "warning",
      description: "Correo o contraseña invalidos",
    });
  };

  return { checkResponse };
};
