"use client";

import { Response } from "@/types/response/response";

interface StatusMessageProps {
  validText?: string;
  invalidText?: string;
  mutation?: {
    isIdle: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
  mutationData?: Response;
}
export const StatusMessage = ({
  validText,
  invalidText,
  mutation,
  mutationData,
}: StatusMessageProps) => {
  return (
    <div className={`${mutation?.isIdle ? "hidden" : "block"}`}>
      <div
        className={`border-l-2 ${
          mutation?.isSuccess &&
          mutationData?.estatus === 1 &&
          "bg-green-50 border-l-green-500"
        }  ${
          mutation?.isError || mutationData?.estatus === 2
            ? "bg-red-50 border-l-red-500"
            : ""
        } p-2  rounded-r-lg`}
      >
        <p>
          {mutationData?.estatus === 1 ? validText : ""}
          {mutation?.isError || mutationData?.estatus === 2 ? invalidText : ""}
        </p>
      </div>
    </div>
  );
};
