"use client";

import { useGetQuinielaVerification } from "@/hooks/quinielaVerification/queries/useGetQuinielaVerification";
import { Card } from "@/components/shared/card/Card";
import { ProtectedRoute } from "@/components/shared/protectedRoute/ProtectedRoute";
import { StatisticsCard } from "@/components/processes/quinielaVerification/StatisticsCard";
import Link from "next/link";
import { Button } from "@/components/shared/button/Button";
import { HeaderPage } from "@/components/ui/headerPage/HeaderPage";
import { Icon } from "@/components/shared/icon/Icon";

export interface Participant {
  iD: number;
  nombre: string;
  quiniela: number;
  resultados: number;
  survivor: boolean;
  existe: number;
}

export default function QuinielaVerificationPage() {
  const { isPending, isError, isSuccess, data } = useGetQuinielaVerification();
  const participants: Participant[] = data?.data;

  const getIcon = (status: boolean) => {
    switch (status) {
      case true:
        return <Icon name="check" size={20} color="green" />;
      case false:
        return <Icon name="x" size={20} color="red" />;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-18">
        <HeaderPage
          title="Proceso de Verificación de Información"
          text="Gestiona la carga y procesamiento de datos de participantes y quinielas."
        />

        <StatisticsCard />

        {isSuccess && (
          <section>
            <div className="w-full max-w-[1280px] mx-auto px-10 py-8">
              <Card>
                <div className="grid">
                  <p className="text-lg text-blue-700 font-semibold">
                    Lista de Participantes
                  </p>
                  <p className=" text-sm text-gray-600">
                    Visualiza el estado general de cada usuario
                  </p>
                </div>

                {isPending && <div>Cargando datos...</div>}

                {isError && <div>Error al cargar los datos.</div>}

                {isSuccess && participants && (
                  <table className="table-fixed">
                    <thead>
                      <tr className="bg-blue-700 hover:bg-blue-700">
                        <th className="text-white font-semibold">ID</th>
                        <th className="text-white font-semibold">Nombre</th>
                        <th className="text-white font-semibold">Quiniela</th>
                        <th className="text-white font-semibold">Resultados</th>
                        <th className="text-white font-semibold">Survivor</th>
                      </tr>
                    </thead>

                    <tbody>
                      {participants.map((participant, index) => (
                        <tr
                          key={index}
                          className="border-b border-neutral-300 hover:bg-gray-200"
                        >
                          <td className="text-center">{participant.iD}</td>
                          <td className="text-center">{participant.nombre}</td>
                          <td className="">
                            {getIcon(!!participant.quiniela)}
                          </td>
                          <td className="">
                            {getIcon(!!participant.resultados)}
                          </td>
                          <td className="">
                            {getIcon(
                              participant.survivor === !!participant.existe
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Card>
            </div>
          </section>
        )}

        <section>
          <div className="flex w-full max-w-[1280px] mx-auto px-10 py-8 gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                type="button"
                title="Volver al Dashboard"
                theme="normal"
              />
            </Link>

            <Button type="submit" title="Enviar Quiniela" onClick={() => {}} />
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
