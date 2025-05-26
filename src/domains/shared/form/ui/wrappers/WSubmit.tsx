import { Button, TButtonVariant } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useShallow } from "zustand/shallow";
import { useFormStore } from "../../core/hooks/useFormStore";
import { TIcon } from "types/config";
import { cn } from "@/lib/utils";

interface IWSubmitProps {
  text: string;
  size?: "lg" | "default" | "sm" | "icon" | null | undefined;
  className?: string;
  icon?: TIcon;
  variant?: TButtonVariant;
}

export const WSubmit = ({
  text,
  size = "lg",
  className,
  icon,
  variant = "default",
}: IWSubmitProps) => {
  const { isFetching } = useFormStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
    }))
  );

  return (
    <Button
      className={cn(className, "font-semibold")}
      type="submit"
      size={size}
      disabled={isFetching}
      variant={variant}
    >
      {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

      {!isFetching && icon}
      <span className="ml-2" />
      {text}
    </Button>
  );
};

// export const WSubmit = memo(Component);
