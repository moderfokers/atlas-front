import { Skeleton } from "@/components/ui/skeleton";

export const LoginFormSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex-auto mb-5">
        <div className="space-y-2">
          <Skeleton className="h-3 mb-3 w-1/3" />
          <Skeleton className="h-9" />
        </div>
      </div>
      <div className="flex-auto mb-5">
        <div className="space-y-2">
          <Skeleton className="h-3 mb-3 w-1/3" />
          <Skeleton className="h-9" />
        </div>
      </div>
      <Skeleton className="h-10" />
    </div>
  );
};
