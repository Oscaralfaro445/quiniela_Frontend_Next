"use client";

import { useKeyValdiation } from "@/hooks/register/mutations/useKeyValidation";
import { KeyValidationSection } from "@/components/register/KeyValidationSection";
import { RegisterSection } from "@/components/register/RegisterSection";

export default function RegisterPage() {
  const mutation = useKeyValdiation();

  const handleValidated = (code: string) => {
    mutation.mutate(code);
  };

  return (
    <>
      {/* {mutation.isIdle ||
      mutation.isError ||
      !mutation.data?.data[0].bExisteQuin ? (
        <KeyValidationSection onValidated={handleValidated} />
      ) : null} */}
      {true && (
        <RegisterSection idQuiniela={mutation.data?.data[0]?.idQuiniela} />
      )}
    </>
  );
}
