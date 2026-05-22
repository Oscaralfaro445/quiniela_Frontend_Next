"use client";

import Link from "next/link";
import { useGetUsers } from "@/hooks/queries/useGetUsers";
import { useUnlockUser } from "@/hooks/mutations/useUnlockUser";
import { Button } from "@/components/shared/button/Button";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function UserStatusPage() {
  const { isPending, isError, data } = useGetUsers();
  const mutation = useUnlockUser();
  const users = data?.data?.[0].participantes;

  const handleUnlockUser = (user: string, status: boolean) => {
    console.log("User:", user, "Status:", status);
    mutation.mutate({ user });
  };

  if (isPending) {
    return <p>Cargando datos...</p>;
  }

  if (isError || !users) {
    return <p>Error al cargar los datos...</p>;
  }

  return (
    <MainContainer>
      <div className="grid gap-4 content-start">
        <PageHeader
          title="Gestión de estatus de los usuarios"
          text="Gestiona el estatus de los usuarios, permitiendo desbloquear aquellos usuarios nuevos."
        />

        <div className="h-full bg-red-200">
          {data?.data?.[0].indicador === "A" ? (
            <table className="w-full table-auto bg-neutral-100">
              <thead className="bg-blue-600">
                <tr className="text-white">
                  <th className="text-left px-4 py-2 border-b">
                    Correo electrónico
                  </th>
                  <th className="text-left px-4 py-2 border-b">Nombre</th>
                  <th className="px-4 py-2 border-b">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users?.map(({ CVE_USUARIO, NOMBRE_COMPLETO, B_BLOQUEADO }) => (
                  <tr key={CVE_USUARIO} className="hover:bg-neutral-200">
                    <td className="px-4 py-2">{CVE_USUARIO}</td>
                    <td className="px-4 py-2">{NOMBRE_COMPLETO}</td>
                    <td
                      className="px-4 py-2 hover:cursor-pointer"
                      onClick={() =>
                        handleUnlockUser(CVE_USUARIO, !B_BLOQUEADO)
                      }
                    >{`${B_BLOQUEADO ? "Bloqueado" : "Activo"}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>
              La quiniela se encuentra cerrada, no se puede modificar el estado
              de los usuarios por el momento.
            </p>
          )}
        </div>

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>

          <Link href="/quiniela">
            <Button type="submit" title="Enviar Quiniela" theme="primary" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
