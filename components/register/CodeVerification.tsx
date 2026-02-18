"use client";

import { useEffect, useState } from "react";
import { useCodeVerification } from "@/hooks/register/mutations/useCodeValidation";
import { CodeVerificationForm } from "./CodeVerificationForm";
import { RegisterForm } from "./RegisterForm";
import { Title } from "../shared/text/Title";
import { TextBody } from "../shared/text/TextBody";

type Status = "code" | "register";

export const CodeVerification = () => {
  const [status, setStatus] = useState<Status>("code");
  const mutation = useCodeVerification();

  useEffect(() => {
    if (mutation?.isIdle || mutation?.isError) {
      setStatus("code");
    } else if (mutation?.isSuccess) {
      if (mutation?.data?.estatus === 1) {
        setStatus("register");
      }
    }
  }, [
    mutation?.isIdle,
    mutation?.isError,
    mutation?.isSuccess,
    mutation?.data,
  ]);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Title
          className="text-center"
          title="Clave de confirmación"
          color="blue"
        />
        <TextBody
          className="text-center"
          text="Ingresa el código proporcionado para poder registrar tu nueva cuenta."
        />
      </div>

      {status === "code" ? (
        <CodeVerificationForm mutation={mutation} />
      ) : (
        <RegisterForm data={mutation?.data?.data?.[0]} />
      )}
    </div>
  );
};
