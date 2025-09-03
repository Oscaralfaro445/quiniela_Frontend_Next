"use client";

import { usePostPeriodClosing } from "@/hooks/periodClosing/mutations/usePostPeriodClosing";
import { Icon } from "@/components/shared/icon/Icon";
import { Card } from "@/components/shared/card/Card";
import { Button } from "@/components/shared/button/Button";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { Title } from "@/components/shared/text/Title";
import { TextBody } from "@/components/shared/text/TextBody";

export default function PeriodOpeningPage() {
  const mutation = usePostPeriodClosing();

  const handleExecuteProcess = () => {
    mutation.mutate();
    console.log(mutation.data);
  };

  return (
    <ProtectedRoute>
      <div className="grid min-h-screen content-center">
        <section className="pt-18">
          <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
            <div className="grid gap-2">
              <Title title="Proceso de Carga de Información" />
              <TextBody
                text="Gestiona la carga y procesamiento de datos de participantes y
          quinielas."
              />
            </div>

            <div className="flex h-fit justify-center items-center border-2 border-blue-600 rounded-2xl">
              <p className="px-2 py-1 text-sm font-semibold text-blue-700">
                NFL temporada 2025
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
            <Card>
              <div className="flex flex-col gap-2">
                <div className="flex gap-4 items-center">
                  <Icon name="database" className="h-5 w-5 text-blue-700" />
                  <span>Estado del Proceso</span>
                </div>

                <p>
                  Ejecuta el proceso de carga para actualizar la información de
                  participantes
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Button
                    type="button"
                    title={
                      mutation.isSuccess
                        ? "Reiniciar Proceso"
                        : "Iniciar Proceso"
                    }
                    icon="play"
                    onClick={handleExecuteProcess}
                    disabled={mutation.isPending}
                  />

                  {mutation.isSuccess && (
                    <div className="flex gap-2 text-green-700 border-green-700">
                      <Icon name="check" />
                      Completado
                    </div>
                  )}
                </div>

                {mutation.isSuccess && (
                  <div className="text-end">
                    <div className="text-2xl font-bold text-red-600">
                      Participantes procesados:{" "}
                      {mutation.data?.data[0]?.Contador}
                    </div>

                    <div className="text-sm text-gray-500">
                      Última actualización: {new Date().toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>

        <section>
          <div className="w-full max-w-[1280px] mx-auto px-10 py-8 gap-4">
            <Card>
              <div>
                <div className="flex items-center space-x-2">
                  <Icon
                    name="alert-triangle"
                    className="h-5 w-5 text-yellow-600"
                  />
                  <span>Mensajes del Sistema</span>
                </div>

                <p>
                  En caso de existir errores de negocio se mostrarán a
                  continuación:
                </p>
              </div>

              {mutation.isSuccess && mutation.data.errorNeg && (
                <div className="mt-4">
                  {mutation.data.errorNeg.map(
                    (error: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon
                          name="alert-triangle"
                          className="h-5 w-5 text-yellow-600"
                        />
                        <span>{error}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </Card>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
