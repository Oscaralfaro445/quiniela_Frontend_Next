"use client";

import { useTokenVerification } from "@/hooks/queries/user/useTokenVerification";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface TokenVerificationProps {
  token: string;
}

export const TokenVerification = ({ token }: TokenVerificationProps) => {
  const { isPending, isError, data } = useTokenVerification({ token });
  console.log({ isPending, isError, data });

  if (isPending) {
    return <div>Verificando token...</div>;
  }

  if (isError || !data || data.estatus !== 1) {
    return <div>Token inválido o expirado.</div>;
  }

  return <ChangePasswordForm />;
};
