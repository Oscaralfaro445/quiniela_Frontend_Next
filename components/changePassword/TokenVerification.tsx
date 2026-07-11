"use client";

import { useTokenVerification } from "@/hooks/queries/user/useTokenVerification";
import { ChangePasswordForm } from "./ChangePasswordForm";

interface TokenVerificationProps {
  token: string;
}

export const TokenVerification = ({ token }: TokenVerificationProps) => {
  const { isPending, isError, data } = useTokenVerification({ token });

  if (isPending) {
    return <p className="text-center">Verificando token...</p>;
  }

  if (isError || !data.data || data.estatus !== 1) {
    return <p className="text-center">Token inválido o expirado.</p>;
  }

  return <ChangePasswordForm user={data.data[0].usuario} />;
};
