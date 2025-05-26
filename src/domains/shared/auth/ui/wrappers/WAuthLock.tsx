import { useShallow } from "zustand/shallow";
import { useAuthStore } from "../../core/hooks/useAuthStore";
import React, { ReactElement } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface WAuthLockProps {
  permission: string;
  children: ReactElement;
  className?: string;
  type?: "hide" | "tooltip";
  // type: "href" | "onClick";
}

const modifyChildren = (
  element: React.ReactNode,
  customClassName = ""
): React.ReactNode => {
  // Check if the element is a valid React element
  if (!React.isValidElement(element)) return element;

  // Recursively modify children if they exist
  const newChildren = React.Children.map(element.props.children, (child) =>
    modifyChildren(child, customClassName)
  );

  // Clone the element with modified children
  return React.cloneElement(element, {
    ...element.props,
    children: newChildren,
    disabled: true,
    onClick: null,
    href: "",
    ["aria-disabled"]: true,
    className: cn(
      element.props.className,
      "pointer-events-none cursor-not-allowed",
      customClassName
    ),
  });
};

export const WAuthLock = ({
  children,
  permission,
  className,
  type = "tooltip",
}: WAuthLockProps) => {
  const { permissions } = useAuthStore(
    useShallow((state) => state.userMetadata)
  );

  const isAllowed = (permissions || []).includes(permission);
  if (isAllowed) return children;
  if (type === "hide") return null;

  const newChildren = modifyChildren(children, className);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{newChildren}</TooltipTrigger>
        <TooltipContent>
          <p className="w-60 text-center">
            <b>
              🚫 Acción no permitida, comuniquese con el administrador para
              mayor información.
            </b>
          </p>

          <Separator className="my-3" />

          <i className="text-xs">{permission}</i>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
