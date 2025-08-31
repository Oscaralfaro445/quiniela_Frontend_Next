"use client";

import Link from "next/link";
import { useGetSurvivorStatus } from "@/hooks/survivorActivation/queries/useGetSurvivorStatus";
import { usePostSurvivorActivation } from "@/hooks/survivorActivation/mutations/usePostSurvicorActivation";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";

export default function SurvivorActivationPage() {
  const { isPending, isError, isSuccess, data } = useGetSurvivorStatus();
  const survivorActivation = usePostSurvivorActivation();

  const handleSurvivorActivation = () => {
    survivorActivation.mutate({
      idEquipo: data.data[0].idEquipoSuv,
      bResucita: !data.data[0].bResucita,
    });
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen justify-center">
        <section className="pt-18">
          <div className="grid lg:flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center lg:justify-between">
            <div className="grid gap-2">
              <Title title="Gestión de Activación de Survivor" />
              <TextBody text="Aquí podrás darle una segunda oportunidad a tu survivor." />
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
              <div className="flex flex-col">
                <span className="text-lg text-blue-700 font-semibold">
                  Equipo Disponible para Resurrección
                </span>
                <span className=" text-sm text-gray-600">
                  Gestiona el estado de activación de cada equipo y su costo
                  asociado
                </span>
              </div>

              {isPending && (
                <div className="p-4 text-gray-500">Cargando...</div>
              )}

              {isError && <div>Error al cargar los datos</div>}

              {isSuccess && data.data.length > 0 ? (
                <div className="flex items-center justify-between p-4 border border-gray-400 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <TeamLogo teamName={data.data[0].nomEquipo} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {data.data[0].nomEquipo}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ID: {data.data[0].idEquipoSuv}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col text-right">
                      <span className="font-semibold text-lg text-gray-900">
                        ${data.data[0].costoSurvivor}
                      </span>

                      <span className="text-sm text-gray-600">Costo</span>
                    </div>

                    <Button
                      type="button"
                      title={data.data[0].bResucita ? "Cancelar" : "Activar"}
                      theme={data.data[0].bResucita ? "danger" : "primary"}
                      onClick={handleSurvivorActivation}
                    />
                  </div>
                </div>
              ) : (
                <span className="text-red-500">
                  No hay equipos disponibles para Resurrección
                </span>
              )}
            </Card>
          </div>
        </section>

        <section>
          <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                type="button"
                title="Volver al Dashboard"
                theme="normal"
              />
            </Link>

            <Link href="/quinielaCapture">
              <Button type="button" title="Hacer Quiniela" />
            </Link>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
