"use client";

import { IRequest } from "./WRequestForm";

import { RequestItem } from "../components/RequestItem";
import { IWRequestFilters } from "./WRequestsFilter";
import { useRequestStore } from "../../core/hooks/useRequestStore";
import { useShallow } from "zustand/shallow";
import { useCrudHandler } from "@/hooks/useCrudHandler";
import { closeRequest } from "../../core/use-cases/closeRequest.server";
import { NavigationService } from "@/services/NavigationService";

export interface IWRequestView {
  requests: IRequest[];
  filters: IWRequestFilters;
}

export const WRequestsList = () => {
  const requests = useRequestStore(useShallow((state) => state.requests));

  const { add: close } = useCrudHandler<IRequest>({
    add: {
      action: closeRequest,
      onSuccess: {
        message: "👍 Asignacion cerrada exitosamente",
        handler: () => NavigationService.redirect("/hub/requests", 1000),
      },
    },
  });

  const onCloseRequestHandler = (request: IRequest) => close(request);

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-scroll mb-6">
      {(requests || []).map((request) => (
        <RequestItem
          onCloseRequest={onCloseRequestHandler}
          key={request.id}
          {...request}
          className="mb-6"
        />
      ))}
    </div>
  );
};
