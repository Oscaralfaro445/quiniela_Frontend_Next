"use client";

interface StatusMessageProps {
  validText?: string;
  invalidText?: string;
  mutation?: {
    isIdle: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
}
export const StatusMessage = ({
  validText,
  invalidText,
  mutation,
}: StatusMessageProps) => {
  return (
    <div className={`${mutation?.isIdle ? "hidden" : "block"}`}>
      <div
        className={`border-l-2 ${
          mutation?.isSuccess && "bg-green-50 border-l-green-500"
        }  ${
          mutation?.isError && "bg-red-50 border-l-red-500"
        } p-2  rounded-r-lg`}
      >
        <p>
          {mutation?.isSuccess ? validText : ""}
          {mutation?.isError ? invalidText : ""}
        </p>
      </div>
    </div>
  );
};
