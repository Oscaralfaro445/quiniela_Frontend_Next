"use client";

import { usePostPeriodOpening } from "@/hooks/periodOpening/mutations/usePostPeriodOpening";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { BusinessErrorPanel } from "@/components/ui/errors/BusinessErrorPanel";
import { PageHeader } from "@/components/ui/pageHeader/PageHeader";

export default function PeriodOpeningPage() {
  const mutation = usePostPeriodOpening();

  const handleExecuteProcess = () => {
    mutation.mutate();
  };

  return (
    <ProtectedRoute>
      <div className="grid min-h-screen pt-18 content-center">
        <PageHeader
          title="Proceso de carga de información"
          text="Gestiona la carga y procesamiento de datos de participantes y
          quinielas"
        />

        <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
          <Card>
            <div className="flex flex-col gap-2 pb-4">
              <div className="flex gap-4 items-center">
                <Icon name="database" className="h-5 w-5 text-blue-700" />
                <span>Estado del Proceso</span>
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
                onClick={handleExecuteProcess}
                disabled={mutation.isPending}
              />

              {mutation.isSuccess && (
                <div className="flex">
                  <Icon name="check" />
                  <p className="text-green-700">Completado</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {mutation.isSuccess && mutation.data?.errorNeg && (
          <BusinessErrorPanel errorNeg={mutation.data.errorNeg} />
        )}
      </div>
    </ProtectedRoute>
  );
}
