"use client";

import { usePostPeriodOpening } from "@/hooks/mutations/usePostPeriodOpening";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { BusinessErrorPanel } from "@/components/ui/errors/BusinessErrorPanel";
import { PageHeader } from "@/components/shared/pageHeader/PageHeader";
import { MainContainer } from "@/components/ui/containers/MainContainer";
import Link from "next/link";

export default function PeriodOpeningPage() {
  const mutation = usePostPeriodOpening();

  const handleExecuteProcess = () => {
    mutation.mutate();
  };

  return (
    <MainContainer>
      <div className="grid gap-4 content-start">
        <PageHeader
          title="Proceso de carga de información"
          text="Gestiona la carga y procesamiento de datos de participantes y
        quinielas"
        />

        <Card>
          <div className="grid gap-2 py-4">
            <div className="flex gap-4 items-center">
              <Icon name="database" className="h-5 w-5 text-blue-700" />
              <p>Estado del Proceso</p>
            </div>

            <p>
              Ejecuta el proceso de carga para actualizar la información de
              participantes
            </p>
          </div>

          {mutation.isSuccess && (
            <div className="flex w-full gap-2 justify-between pb-2">
              <div className="">
                <p className="text-2xl font-bold text-red-600">
                  Participantes procesados:{" "}
                  {mutation.data?.data?.[0]?.Contador ?? 0}
                </p>

                <p className="text-sm text-gray-500">
                  Última actualización: {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              title={
                mutation.isSuccess ? "Reiniciar Proceso" : "Iniciar Proceso"
              }
              icon="play"
              disabled={mutation.isPending}
              onClick={handleExecuteProcess}
            />

            {mutation.isSuccess && (
              <div className="flex">
                <Icon name="check" />
                <p className="text-green-700">Completado</p>
              </div>
            )}
          </div>
        </Card>

        {mutation.isSuccess && mutation.data?.errorNeg && (
          <BusinessErrorPanel errorNeg={mutation.data.errorNeg} />
        )}

        <div className="flex w-full gap-4 justify-center">
          <Link href="/dashboard">
            <Button type="button" title="Volver al Dashboard" theme="normal" />
          </Link>
        </div>
      </div>
    </MainContainer>
  );
}
