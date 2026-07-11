"use client";

import { useEffect, useState } from "react";
import { useCodeVerification } from "@/hooks/mutations/user/useCodeVerification";
import { CodeVerificationForm } from "./CodeVerificationForm";
import { RegisterForm } from "./RegisterForm";
import { TextBody } from "../shared/text/TextBody";
import { Title } from "../shared/text/Title";

type Status = "code" | "register";

export const CodeVerification = () => {
  const [status, setStatus] = useState<Status>("code");
  const mutation = useCodeVerification();

  useEffect(() => {
    if (mutation?.isIdle || mutation?.isError) {
      setStatus("code");
    } else if (mutation?.isSuccess) {
      if (mutation?.data?.estatus === 1) setStatus("register");
    }
  }, [
    mutation?.isIdle,
    mutation?.isError,
    mutation?.isSuccess,
    mutation?.data,
  ]);

  return (
    <div className="grid w-full gap-4">
      <div className="grid gap-2">
        <Title
          className="text-center"
          title={`${status === "code" ? "Clave de confirmación" : "Registro"}`}
          color="blue"
        />
        <TextBody
          className="text-center"
          text={`${status === "code" ? "Ingresa el código proporcionado para poder registrar tu nueva cuenta." : "Completa el formulario para finalizar tu registro."}`}
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
