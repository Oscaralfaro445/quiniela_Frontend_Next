"use client";

import { useKeyValdiation } from "@/hooks/register/mutations/useKeyValidation";
import { KeyValidationSection } from "@/components/register/KeyValidationSection";
import { RegisterSection } from "@/components/register/RegisterSection";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function RegisterPage() {
  const mutation = useKeyValdiation();

  const handleValidated = (code: string) => {
    mutation.mutate(code);
  };

  return (
    <MainContainer>
      <div className="grid items-center">
        {mutation.isIdle ||
        mutation.isError ||
        !mutation.data?.data[0].bExisteQuin ? (
          <KeyValidationSection onValidated={handleValidated} />
        ) : null}
        {mutation.isSuccess && (
          <RegisterSection idQuiniela={mutation.data?.data[0]?.idQuiniela} />
        )}
      </div>
    </MainContainer>
  );
}
