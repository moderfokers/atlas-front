"use client";

import { useFormStore } from "@/domains/shared/form/core/hooks/useFormStore";
import { useShallow } from "zustand/shallow";

export const LoadingComponent = () => {
  const { isFetching } = useFormStore(
    useShallow((state) => ({
      isFetching: state.isFetching,
    }))
  );

  return (
    isFetching && (
      <div className="fixed bottom-0 right-0 flex w-[200px] italic font-semibold justify-end bg-slate-100 align-middle px-4 py-2 rounded-ss-xl">
        <p className="text-xs">Conectando con el servidor...</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" className="w-24">
          <path
            fill="none"
            stroke="#25A7E0"
            strokeDasharray="300 385"
            strokeLinecap="round"
            strokeWidth="15"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
              values="685;-685"
            ></animate>
          </path>
        </svg>
      </div>
    )
  );
};
