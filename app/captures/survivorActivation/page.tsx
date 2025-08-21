"use client";

import Link from "next/link";
import useGetSurvivorStatus from "@/hooks/survivorActivation/queries/useGetSurvivorStatus";
import usePostSurvivorActivation from "@/hooks/survivorActivation/mutations/usePostSurvicorActivation";
import { TextBody } from "@/components/shared/text/TextBody";
import { Title } from "@/components/shared/text/Title";
import { Button } from "@/components/shared/button/Button";
import { Card } from "@/components/shared/card/Card";
import { Icon } from "@/components/shared/icon/Icon";
import { TeamLogo } from "@/components/shared/teamLogo/TeamLogo";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";

export default function SurvivorActivationPage() {
  const survivorStatus = useGetSurvivorStatus();
  const survivorActivation = usePostSurvivorActivation();
  const survivorData = survivorStatus?.data?.data[0];

  const handleSurvivorActivation = () => {
    survivorActivation.mutate({
      idEquipo: survivorData.idEquipoSuv,
      bResucita: !survivorData.bResucita,
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
            <Card className="border-gray-200">
              <div>
                <div className="flex items-center space-x-2">
                  <Icon name="check" />
                  <span>Equipo Disponible para Resurrección</span>
                </div>
                <div>
                  Gestiona el estado de activación de cada equipo y su costo
                  asociado
                </div>
              </div>

              {survivorData && (
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <TeamLogo teamName={survivorData.nomEquipo} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {survivorData?.nomEquipo}
                          </h3>
                          <p className="text-sm text-gray-600">
                            ID: {survivorData.idEquipoSuv}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${survivorData.costoQuiniela}
                          </p>
                          <p className="text-sm text-gray-600">Costo</p>
                        </div>

                        <Button
                          type="button"
                          title={
                            survivorData.bResucita ? "Cancelar" : "Activar"
                          }
                          theme={survivorData.bResucita ? "primary" : "danger"}
                          onClick={handleSurvivorActivation}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
