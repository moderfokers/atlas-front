import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
        className
      )}
    >
      <SearchIcon className="h-[16px] w-[16px] mr-3" />
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-white file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Search.displayName = "Search";

export { Search };
