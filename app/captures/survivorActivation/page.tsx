"use client";

import Link from "next/link";
import { useGetSurvivorStatus } from "@/hooks/survivorActivation/queries/useGetSurvivorStatus";
import { usePostSurvivorActivation } from "@/hooks/survivorActivation/mutations/usePostSurvicorActivation";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";

export default function SurvivorActivationPage() {
  const { isPending, isError, isSuccess, data } = useGetSurvivorStatus();
  const survivorActivation = usePostSurvivorActivation();

  const handleSurvivorActivation = () => {
    survivorActivation.mutate({
      idEquipo: data?.data?.[0]?.idEquipoSuv,
      bResucita: !data?.data?.[0]?.bResucita,
    });
  };

  return (
    <MainContainer>
      <div className="grid gap-4 content-start">
        <PageHeader
          title="Gestión de Activación de Survivor"
          text="Aquí podrás darle una segunda oportunidad a tu survivor"
        />

        <div className="grid lg:flex w-full gap-4 justify-center lg:justify-between">
          <Card>
            <div className="flex flex-col">
              <p className="text-lg text-blue-700 font-semibold">
                Equipo disponible para resurrección
              </p>
              <p className=" text-sm text-gray-600">
                Gestiona el estado de activación de cada equipo y su costo
                asociado
              </p>
            </div>

            {isPending && <p className="text-neutral-600">Cargando...</p>}

            {isError && (
              <p className="text-neutral-600">Error al cargar los datos...</p>
            )}

            {isSuccess && data?.data?.length > 0 ? (
              <div className="flex flex-wrap items-center justify-between p-4 border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex gap-4 items-center">
                  <TeamLogo teamName={data?.data?.[0]?.nomEquipo} />

                  <div>
                    <h3 className="font-semibold text-neutral-700">
                      {data?.data?.[0]?.nomEquipo}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {`ID: ${data?.data?.[0]?.idEquipoSuv}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex flex-col text-right">
                    <p className="font-semibold text-lg text-neutral-700">
                      ${data?.data?.[0]?.costoSurvivor}
                    </p>

                    <p className="text-sm text-neutral-600">Costo</p>
                  </div>

                  <Button
                    type="button"
                    title={data?.data?.[0]?.bResucita ? "Cancelar" : "Activar"}
                    theme={data?.data?.[0]?.bResucita ? "danger" : "primary"}
                    onClick={handleSurvivorActivation}
                  />
                </div>
              </div>
            ) : (
              <p className="text-red-500">
                No hay equipos disponibles para Resurrección
              </p>
            )}
          </Card>
        </div>

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al dashboard" theme="normal" />
          </Link>

          <Link href="/quiniela">
            <Button type="button" title="Ver quiniela" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
